import React from 'reactn';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link } from "react-router-dom";

import { getHotels } from '../services/api';

import { getNextDay, getToday } from '../services/dates';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};


class ListHotels extends React.Component {

  state = {
    hotels: [],
  }

  async componentDidMount() {
    const hotels = await getHotels();
    this.setState({
      hotels
    });
  }

  render() {
  const { classes } = this.props;
  const { hotels } = this.state;
  const { language, lanCode } = this.global;
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{language.hotel}</TableCell>
            <TableCell >{language.address}</TableCell>
            <TableCell >{language.phone}</TableCell>
            <TableCell >{language.tambon}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
              <Link to={'/hotel-details/' + getToday() + '/' + getNextDay(new Date()) + '/' + n.id}  >
                {lanCode === 'en' ? n.name_english : n.name_thai}
                </Link>
              </TableCell>
              <TableCell >{lanCode === 'en' ? n.address_english : n.address_thai}</TableCell>
              <TableCell >{n.phone}</TableCell>
              <TableCell >{lanCode === 'en' ? n.tambon_english : n.tambon_thai}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
}

ListHotels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListHotels);