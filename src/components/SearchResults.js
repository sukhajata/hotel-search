import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { search } from '../services/api';

const styles = {
  block: {
    width: '95%',
    margin: 10,
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
    this.props.history.push('/hotel-details/' + arrive + '/' + depart + "/" + id + "/");
  }

  render() {
    const { classes } = this.props;
    const { hotels } = this.state;
    
    return (
        <React.Fragment>
          {hotels.map(h => (
            <Paper key={h.hotel_id} className={classes.block} onClick={() => this.handleClick(h.hotel_id)}>
              <Grid container  spacing={8}>
                {h.image_name && 
                <Grid item>
                  <img style={{height:200, width: 200 }}
                    src={"https://sukhajata.com/h/img/small/" + h.image_name}
                    alt="Nice to see everyone"
                  />
                </Grid>
                }
                <Grid item>
                  <Typography variant="body2" style={{ paddingTop: 15, paddingLeft: 15 }}>
                      {h.hotel_name_english}
                  </Typography>
                  <Typography variant="body2" style={{ paddingLeft: 15 }}>
                    {h.hotel_name_thai}
                  </Typography>
                  <Typography variant="body2" style={{ padding: 15 }}>
                    {h.min_price}฿
                  </Typography>
                </Grid>
              
              </Grid>
            </Paper>       
          ))}
      </React.Fragment>
      
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResults);