import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import { updateHotel, updateRoom, getTambons, getHotel, getHotelRooms } from '../services/api';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  menu: {
    width: 200,
  },
});


class EditHotel extends React.Component {
  state = {
    tambons: [],
    hotelRooms: [],
    id: 0,
    nameThai: '',
    nameEnglish: '',
    phone: '',
    addressThai: '',
    addressEnglish: '',
    tambonId: 1,
    labelWidth: 0,
  };

  async componentDidMount() {
    
    const tambons = await getTambons();
    const hotels = await getHotel(this.props.match.params.id);
    const hotelRooms = await getHotelRooms(this.props.match.params.id);
    
    if (tambons && hotels && hotelRooms) {
        const hotel = hotels[0];
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
            tambons,
            hotelRooms,
            id: hotel.id,
            nameThai: hotel.name_thai,
            nameEnglish: hotel.name_english,
            phone: hotel.phone,
            addressThai: hotel.address_thai,
            addressEnglish: hotel.address_english,
            tambonId: hotel.tambon_id,
          });
    }
   
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleRoomCountChange = id => event => {
    let hotelRooms = this.state.hotelRooms.map(item => {
      if (item.id === id) {
        item.count = event.target.value;
      }
      return item;
    });
    
    this.setState({
      hotelRooms
    });
  }

  handleRoomPriceChange = id => event => {
    let hotelRooms = this.state.hotelRooms.map(item => {
      if (item.id === id) {
        item.price = event.target.value;
      }
      return item;
    });
    
    this.setState({
      hotelRooms
    });
  }

  onFormSubmit = async () => {
    const { id, nameEnglish, nameThai, addressEnglish, addressThai, tambonId, phone, lat, lng } = this.state;
    const data = {
        name_english: nameEnglish,
        name_thai: nameThai,
        address_english: addressEnglish,
        address_thai: addressThai,
        tambon_id: tambonId,
        phone: phone,
        id: id,
    };
    const result = await updateHotel(data);
    if (result !== null) {
      this.state.hotelRooms.forEach(async item => {
        const roomData = {
            id: item.id,
            room_count: item.count,
            price: item.price
        };
        await updateRoom(roomData);
      })
    } else {
      alert("Error");
    }

    
  }

  onPlaceFound = place => {
    const point = place.geometry.location;
    this.setState({
      nameEnglish: place.name,
      phone: place.formatted_phone_number,
      addressEnglish: place.formatted_address,
      lat: point.lat(),
      lng: point.lng(),
    })
  }

  render() {
    const { classes } = this.props;
    const { nameEnglish, nameThai, addressEnglish, addressThai, phone, tambons, hotelRooms } = this.state;

    return (
      <React.Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="hotel-name-thai"
            label="ชื่อ"
            value={nameThai}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('nameThai')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <TextField
            id="hotel-name-english"
            label="Name"
            value={nameEnglish}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('nameEnglish')}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="hotel-phone"
            label="Phone โทรศัพท์"
            value={phone}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('phone')}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="hotel-address-thai"
            label="ที่อยู่"
            value={addressThai}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('addressThai')}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="hotel-address-english"
            label="Address"
            value={addressEnglish}
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('addressEnglish')}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl 
            variant="outlined" 
            className={classes.formControl}
            fullWidth
          >
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-tambon"
            >
              Tambon ตำบล
            </InputLabel>
            <Select
              value={this.state.tambonId}
              onChange={this.handleChange('tambonId')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="tambon"
                  id="outlined-tambon"
                />
              }
            >
              {tambons.map(tambon => 
                <MenuItem key={tambon.id} value={tambon.id}>{tambon.name_english + " " + tambon.name_thai}</MenuItem>
              )}
            </Select>
          </FormControl>
          
          {hotelRooms.map(roomType => (
            <div key={roomType.id}>
              <Typography variant="body1">
                {roomType.name_english + " / " + roomType.name_thai}
              </Typography>
              <TextField
                label="count / จำนวน"
                style={{ margin: 8 }}
                margin="normal"
                type="number"
                variant="outlined"
                value={roomType.count}
                onChange={this.handleRoomCountChange(roomType.id)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="price / ราคา"
                style={{ margin: 8 }}
                margin="normal"
                type="number"
                variant="outlined"
                value={roomType.price}
                onChange={this.handleRoomPriceChange(roomType.id)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          ))}

          <Button 
            onClick={this.onFormSubmit}
            variant="contained"
            color="primary"
            style={{ margin: 8 }}
          >
            Submit
          </Button>
        </form>
     
    </React.Fragment>
    );
  }
}

EditHotel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditHotel);