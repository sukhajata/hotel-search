import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { search } from '../services/api';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
    backgroundColor: '#d3d3d3',
  },
};


class SearchResults extends React.Component {

  state = {
    hotels: [],
  }

  async componentDidMount() {
    const { arrive, depart } = this.props.match.params;
    const hotels = await search(arrive, depart);
    this.setState({
      hotels
    });
  }

  handleClick = id => {
    const { arrive, depart } = this.props.match.params;
    this.props.history.push('/confirm/' + arrive + '/' + depart + "/" + id + "/");
  }

  render() {
  const { classes } = this.props;
  const { hotels } = this.state;
  
  return (
    <Paper className={classes.root}>
        {hotels.map(h => (
            <div key={h.hotel_id}>
                <Typography variant="h6" style={{ padding: 15 }}>
                    {h.hotel_name_english + " / " + h.hotel_name_thai}
                </Typography>
                <Table className={classes.table}>
                    <TableBody>
                    {h.rooms.map(n => (
                         <TableRow key={n.room_id}>
                            <TableCell component="th" scope="row" onClick={() => this.handleClick(n.room_id)}> 
                                {n.room_type_english + " / " + n.room_type_thai}
                            </TableCell>
                            <TableCell align="right">{n.price}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
           </div>
        ))}
     
    </Paper>
  );
}
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResults);