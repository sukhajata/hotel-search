import React from 'reactn';

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
        const { language, lanCode } = this.global;

        return (
            <div className={classes.confirm}>
                <Table >
                    <TableBody>
                         <TableRow key="arrive">
                            <TableCell>{language.arrive}</TableCell>
                            <TableCell >{arrive}</TableCell>
                        </TableRow>
                        <TableRow key="depart">
                            <TableCell>{language.depart}</TableCell>
                            <TableCell >{depart}</TableCell>
                        </TableRow>
                        <TableRow key="hotel">
                            <TableCell>{language.hotel}</TableCell>
                            <TableCell >{lanCode === 'en' ? hotelNameEnglish : hotelNameThai}</TableCell>
                        </TableRow>
                        <TableRow key="room">
                            <TableCell>{language.room}</TableCell>
                            <TableCell>{lanCode === 'en' ? roomTypeEnglish : roomTypeThai}</TableCell>
                        </TableRow>
                        <TableRow key="price">
                            <TableCell>{language.price}</TableCell>
                            <TableCell>{price}</TableCell>
                        </TableRow>
                        <TableRow key="total">
                            <TableCell>{language.total}</TableCell>
                            <TableCell>{total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div style={{margin: 20, textAlign: 'center'}}>
                    <div style={{display: 'inline-block'}}>
                        <Button 
                            variant="contained" 
                            color="secondary"
                            style={{marginRight: 5}}
                            onClick={this.handleClickBack}    
                        >
                            {language.back}
                        </Button>

                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={this.handleClickContinue}    
                            style={{marginLeft: 5}}
                        >
                            {language.continue}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Confirm);