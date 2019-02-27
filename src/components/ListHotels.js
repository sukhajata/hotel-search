import React from 'react';
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
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name / ชื่อ</TableCell>
            <TableCell >Address / ที่อยู่</TableCell>
            <TableCell >Phone / โทรศัพท์</TableCell>
            <TableCell >Tambon / ตำบล</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                <Link to={'/edit-hotel/' + n.id}  >
                {n.name_english + " / " + n.name_thai}
                </Link>
              </TableCell>
              <TableCell >{n.address_english + " / " + n.address_thai}</TableCell>
              <TableCell >{n.phone}</TableCell>
              <TableCell >{n.tambon_english + " / " + n.tambon_thai}</TableCell>
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