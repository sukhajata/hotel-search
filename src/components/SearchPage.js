import React from 'reactn';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import Languages from './Languages';

import { withRouter } from 'react-router-dom'


class SearchPage extends React.Component {

    state ={
        arrive: this.getToday(),
        depart: this.getNextDay(new Date()),
    }

    handleChange = name => event => {
        const date = new Date(event.target.value);
        if (date < new Date()) {
            return;
        }
        if (name === 'arrive') {
            this.setState({
                arrive: event.target.value,
                depart: this.getNextDay(new Date(event.target.value)),
            })
        } else {
            if (date <= new Date(this.state.arrive)) {
                return;
            }
            this.setState({ [name]: event.target.value })
        }
    }


    getDate(dd) {
        const year = dd.getFullYear();
        const month = dd.getMonth() + 1;
        const day = dd.getDate();
        return year + '-' + (month.toString().length === 1 ? '0' + month.toString() : month.toString()) + '-' + (day.toString().length === 1 ? '0' + day.toString() : day.toString());
    }

    getToday() {
        const dd = new Date();
        return this.getDate(dd);
    }

    getNextDay(date) {
        const ms = date.getTime() + (1000*60*60*24);
        const dd = new Date(ms);
        return this.getDate(dd);
    }

    render() {
        const { classes } = this.props;
        const { arrive, depart } = this.state;
        const { language } = this.global;

        const SubmitButton = withRouter(({ history }) => (
            <Button
              onClick={() => { history.push('/search-results/' + arrive + '/' + depart + '/') }}
              variant="contained"
              color="primary"
            >
              {language.go}
            </Button>
          ));
        
        return (
            <div className={classes.searchPage}>
                <Languages />
                <Paper className={classes.searchForm}>
                    <Typography variant="h5" style={{marginBottom: 20}}>
                        {language.title}
                    </Typography>
                    <form  noValidate>
                        <TextField
                            id="arrive"
                            label={language.arrive}
                            type="date"
                            fullWidth
                            value={this.state.arrive}
                            className={classes.dateField}
                            onChange={this.handleChange('arrive')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                         <TextField
                            id="depart"
                            label={language.depart}
                            fullWidth
                            type="date"
                            value={this.state.depart}
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