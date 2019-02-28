import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
  } from '../services/utils';
import { getRoom } from '../services/api';

class Confirm extends React.Component {

    state = {
        hotelNameEnglish: '',
        hotelNameThai: '',
        roomTypeEnglish: '',
        roomTypeThai: '',
        price: '',
        total: '',
        number: '',
        name: '',
        expiry: '',
        focused: '',
        cvc: '',
        formData: null,
        issuer: '',
    }

    async componentDidMount() {
        const result = await getRoom(this.props.match.params.id);
        const { arrive, depart } = this.props.match.params;
        const days = Math.floor((Date.parse(depart) - Date.parse(arrive)) / (1000*60*60*24));
        if (result !== null) {
            this.setState({
                hotelNameEnglish: result.hotel_name_english,
                hotelNameThai: result.hotel_name_thai,
                roomTypeEnglish: result.room_type_english,
                roomTypeThai: result.room_type_thai,
                price: result.price,
                total: parseInt(result.price) * days,
            });
        }
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
          this.setState({ issuer });
        }
      };
    
      handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
        });
      };
    
      handleInputChange = ({ target }) => {
        if (target.name === 'number') {
          target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
          target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
          target.value = formatCVC(target.value);
        }
    
        this.setState({ [target.name]: target.value });
      };
    
      handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
          .filter(d => d.name)
          .reduce((acc, d) => {
            acc[d.name] = d.value;
            return acc;
          }, {});
    
        this.setState({ formData });
        this.form.reset();
      };

    render() {
        const { arrive, depart } = this.props.match.params;
        const { hotelNameEnglish, hotelNameThai, roomTypeEnglish, roomTypeThai, price, total, number, name, expiry, cvc, focused, issuer } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.confirm}>
                <Table >
                    <TableBody>
                         <TableRow key="arrive">
                            <TableCell>Arrive / มาถึง</TableCell>
                            <TableCell >{arrive}</TableCell>
                        </TableRow>
                        <TableRow key="depart">
                            <TableCell>Depart / ออก</TableCell>
                            <TableCell >{depart}</TableCell>
                        </TableRow>
                        <TableRow key="hotel">
                            <TableCell>Hotel / โรงแรม</TableCell>
                            <TableCell >{hotelNameEnglish + " / " + hotelNameThai}</TableCell>
                        </TableRow>
                        <TableRow key="room">
                            <TableCell>Room / ห้อง</TableCell>
                            <TableCell>{roomTypeEnglish + " / " + roomTypeThai}</TableCell>
                        </TableRow>
                        <TableRow key="price">
                            <TableCell>Price / ราคา</TableCell>
                            <TableCell>{price}</TableCell>
                        </TableRow>
                        <TableRow key="total">
                            <TableCell>Total / ทั้งหมด</TableCell>
                            <TableCell>{total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focused}
                />
                <form ref={c => (this.form = c)} className={classes.credit} onSubmit={this.handleSubmit}>
                    <TextField
                        name="number"
                        label="Number / หมายเลข"
                        pattern="[\d| ]{16,22}"
                        required
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="name"
                        label="Name / ชื่อบนบัตร"
                        required
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                     <TextField
                        name="expiry"
                        label="Expiry / หมดอายุ"
                        required
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="cvc"
                        label="CVCุ"
                        required
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <input type="hidden" name="issuer" value={issuer} />
                    
                    <Button variant="contained" color="primary">
                        PAY / จ่าย
                    </Button>
                    
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(Confirm);