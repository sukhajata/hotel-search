import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class CustomerDetails extends React.Component {

    constructor(props) {
        super(props);
        if (localStorage.getItem('total') === undefined || localStorage.getItem('total') === '') {
            this.props.history.push('/');
        }
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
        }
    
    }
    
    

    handleInputChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    }

    handleSubmit = () => {
        const { firstName, lastName, email } = this.state;
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
        this.props.history.push('/credit-details/');
    }

    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.container}>
                <TextField
                    name="firstName"
                    label="First name / ชื่อ"
                    required
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    name="lastName"
                    label="Last name / นามสกุล"
                    required
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    name="email"
                    label="Email / อีเมล"
                    required
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                    Continue / ต่อไป
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerDetails);