import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';


import { getRoom } from '../services/api';

class Confirm extends React.Component {

    state = {
        hotelNameEnglish: '',
        hotelNameThai: '',
        roomTypeEnglish: '',
        roomTypeThai: '',
        price: '',
        total: '',
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

    handleClickBack = () => {
        const { arrive, depart, id } = this.props.match.params;
        this.props.history.push('/hotel-details/' + arrive + '/' + depart + "/" + id + "/");
    }

    handleClickContinue = () => {
        const { arrive, depart, id } = this.props.match.params;
        localStorage.setItem('arrive', arrive);
        localStorage.setItem('depart', depart);
        localStorage.setItem('roomId', id);
        localStorage.setItem('total', this.state.total);
        this.props.history.push('/customer-details/');
    }


    render() {
        const { arrive, depart } = this.props.match.params;
        const { hotelNameEnglish, hotelNameThai, roomTypeEnglish, roomTypeThai, price, total } = this.state;
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
                <Grid container spacing={8}>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={this.handleClickBack}    
                        >
                            Back / กลับ
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={this.handleClickContinue}    
                        >
                            Continue / ต่อไป
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Confirm);