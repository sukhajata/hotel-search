import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import { withRouter } from 'react-router-dom'

class SearchPage extends React.Component {

    state ={
        arrive: null,
        depart: null,
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }


    render() {
        const { classes } = this.props;
        const { arrive, depart } = this.state;

        const SubmitButton = withRouter(({ history }) => (
            <Button
              onClick={() => { history.push('/search-results/' + arrive + '/' + depart + '/') }}
              variant="contained"
              color="primary"
            >
              Go!
            </Button>
          ));
        
        return (
            <div className={classes.searchPage}>
                <Paper className={classes.searchForm}>
                    <form className={classes.container} noValidate>
                        <TextField
                            id="arrive"
                            label="Arrive / มาถึง"
                            type="date"
                            fullWidth
                            className={classes.dateField}
                            onChange={this.handleChange('arrive')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                         <TextField
                            id="depart"
                            label="Depart / ออก"
                            fullWidth
                            type="date"
                            className={classes.dateField}
                            onChange={this.handleChange('depart')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <SubmitButton/>
                    </form>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(SearchPage);