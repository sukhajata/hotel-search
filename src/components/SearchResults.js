import React from 'reactn';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { search } from '../services/api';
import { getDistance } from '../services/utils';
import { Hidden } from '@material-ui/core';

const styles = {
  block: {
    margin: 15,
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
    const { lanCode, language } = this.global;

    return (
        <div style={{backgroundColor: '#f2f2f2'}}>
          {hotels.map(h => (
            <Paper key={h.hotel_id} className={classes.block} onClick={() => this.handleClick(h.hotel_id)}>
              <Hidden xsDown implementation="css">
                <Grid container  spacing={8}>
                  {h.image_name && 
                  <Grid item>
                    <img style={{width: '100%', maxWidth: 400}}
                      src={"https://sukhajata.com/h/img/wide/" + h.image_name}
                      alt="Nice to see everyone"
                    />
                  </Grid>
                  }
                  <Grid item>
                    <Typography variant="body2" style={{ paddingTop: 15, paddingLeft: 15 }}>
                        {lanCode === 'th' ? h.hotel_name_thai : h.hotel_name_english}
                    </Typography>
                    <Typography variant="body2" style={{paddingLeft: 15}}>
                      {getDistance(parseFloat(h.latitude), parseFloat(h.longitude))}{language.fromKhemmarat}
                    </Typography>
                    <Typography variant="h6" style={{ padding: 15 }}>
                      {h.min_price}฿
                    </Typography>
                  </Grid>
                </Grid>
              </Hidden>
              <Hidden smUp implementation="css">
                <Grid container  spacing={8}> 
                    {h.image_name && 
                    <Grid item>
                      <img style={{width: '100%'}}
                        src={"https://sukhajata.com/h/img/wide/" + h.image_name}
                        alt="Nice to see everyone"
                      />
                    </Grid>
                    }
                    <Grid item>
                      <Typography variant="body2" style={{ paddingTop: 15, paddingLeft: 15 }}>
                        {lanCode === 'th' ? h.hotel_name_thai : h.hotel_name_english}
                      </Typography>
                      <Typography variant="body2" style={{paddingLeft: 15}}>
                        {getDistance(parseFloat(h.latitude), parseFloat(h.longitude))}
                        {language.fromKhemmarat}
                      </Typography>
                      <Typography variant="h6" style={{ padding: 15 }}>
                        {h.min_price}฿
                      </Typography>
                    </Grid>
                  </Grid>
              </Hidden>
            </Paper>       
          ))}
      </div>
      
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResults);