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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { updateHotel, updateRoom, getTambons, getHotel, getHotelRooms, getHotelPhotos, addHotelPhoto, addRoomPhoto } from '../services/api';


const styles = theme => ({
  container: {
    marginTop: 70,
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
    photos: [],
    id: 0,
    nameThai: '',
    nameEnglish: '',
    phone: '',
    addressThai: '',
    addressEnglish: '',
    tambonId: 1,
    labelWidth: 0,
    imageName: '',
    isDefault: false,
    roomImageName: '',
    roomImageIsDefault: false,
  };

  async componentDidMount() {
    
    const tambons = await getTambons();
    const hotels = await getHotel(this.props.match.params.id);
    const hotelRooms = await getHotelRooms(this.props.match.params.id);
    
    const photos = await getHotelPhotos(this.props.match.params.id);
    if (tambons && hotels && hotelRooms && photos) {
        const hotel = hotels[0];
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
            tambons,
            hotelRooms,
            photos,
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
    const { id, nameEnglish, nameThai, addressEnglish, addressThai, tambonId, phone } = this.state;
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

  addImage = async () => {
    const data = {
      hotel_id: this.props.match.params.id,
      image_name: this.state.imageName,
      is_default: this.state.isDefault,
    };
    const result = await addHotelPhoto(data);
    if (result === null) {
      alert("An error occurred.");
    } else {
      const photos = await getHotelPhotos(this.props.match.params.id);
      this.setState({
        photos
      })
    }
  }

  addRoomImage = async (room_id) => {
    const data = {
      room_id, 
      image_name: this.state.roomImageName,
      is_default: this.state.roomImageIsDefault,
    };
    const result = await addRoomPhoto(data);
    if (result === null) {
      alert("An error occurred.");
    } else {
      const hotelRooms = await getHotelRooms(this.props.match.params.id);
      this.setState({
        hotelRooms
      })
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

  handleImageNameChange = event => {

  }

  render() {
    const { classes } = this.props;
    const { nameEnglish, nameThai, addressEnglish, addressThai, phone, tambons, hotelRooms, photos } = this.state;

    return (
      <div >
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
          <div style={{margin: 10, width:'100%'}}>
          {photos.map(photo => 
              <Grid container key={photo.id} spacing={8}>
                <Grid item>
                  <FormControlLabel
                  control={
                    <Checkbox
                      onChange={this.handleChange('isDefault')}
                      value="true"
                    />
                  }
                  label="Default"
                />
                </Grid>  
                <Grid item>
                  <img style={{width:100}} src={"https://sukhajata.com/h/img/small/" + photo.image_name} alt={photo.image_name} />
                </Grid>
                
              </Grid>
            )}
            </div>
          <Paper style={{ margin: 10, padding: 10, width: '100%'}} >
            <Typography variant="h6">
              Add image
            </Typography>
            <TextField
              label="Image name"
              style={{ margin: 8, width: 200 }}
              
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('imageName')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.handleChange('isDefault')}
                  value="true"
                />
              }
              label="Default"
            />
            <Button variant="contained" color="secondary" onClick={this.addImage}>Add</Button>
          </Paper>
          
          <Typography variant="h5" style={{margin: 10}}>
              Rooms 
          </Typography>
          {hotelRooms.map(room => (
            <Paper key={room.id} style={{ margin: 10, width: '100%' }}>
              <Typography variant="h6" style={{ padding: 10 }}>
                {room.name_english + " / " + room.name_thai}
              </Typography>
              <TextField
                label="count / จำนวน"
                style={{ margin: 8 }}
                margin="normal"
                type="number"
                variant="outlined"
                value={room.count}
                onChange={this.handleRoomCountChange(room.id)}
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
                value={room.price}
                onChange={this.handleRoomPriceChange(room.id)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {room.images.map(photo => (
                 <Grid container key={photo.image_name} spacing={8}>
                  <Grid item>
                    <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleChange('numsy')}
                        checked={photo.is_default === "1"}
                      />
                    }
                    label="Default"
                  />
                  </Grid>  
                  <Grid item>
                    <img style={{width:100}} src={"https://sukhajata.com/h/img/small/" + photo.image_name} alt={photo.image_name} />
                  </Grid>
                 
                </Grid>
              
              ))}
              <Typography variant="body1" style={{ padding: 10 }}>
                Add image
              </Typography>
              <TextField
                label="Image name"
                style={{ margin: 8, width: 200 }}
                margin="normal"
                variant="outlined"
                onChange={this.handleChange('roomImageName')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleChange('roomImageIsDefault')}
                    value="true"
                  />
                }
                label="Default"
              />
              <Button variant="contained" color="secondary" onClick={() => this.addRoomImage(room.id)}>Add</Button>
            </Paper>
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
     
    </div>
    );
  }
}

EditHotel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditHotel);