import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import { Typography } from '@material-ui/core';

import { getRoom } from '../services/api';

class Complete extends React.Component {

    state = {
        hotelNameEnglish: '',
        hotelNameThai: '',
        roomTypeEnglish: '',
        roomTypeThai: '',
        price: '',
        total: '',
    }

    async componentDidMount() {
        const result = await getRoom(localStorage.getItem('roomId'));
        const days = Math.floor((Date.parse(localStorage.getItem('depart')) - Date.parse(localStorage.getItem('arrive'))) / (1000*60*60*24));
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

    render() {
        const { hotelNameEnglish, hotelNameThai, roomTypeEnglish, roomTypeThai, price, total } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Typography variant="h5" style={{margin: 20}}>
                    Transaction complete / การทำธุรกรรมเสร็จสมบูรณ์
                </Typography>
                <Table >
                    <TableBody>
                         <TableRow key="arrive">
                            <TableCell>Arrive / มาถึง</TableCell>
                            <TableCell >{localStorage.getItem('arrive')}</TableCell>
                        </TableRow>
                        <TableRow key="depart">
                            <TableCell>Depart / ออก</TableCell>
                            <TableCell >{localStorage.getItem('depart')}</TableCell>
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
            </div>
        )
    }
}

export default withStyles(styles)(Complete);