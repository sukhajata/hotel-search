import React from 'reactn';

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
        const { language, lanCode } = this.global;

        return (
            <div className={classes.container}>
                <TextField
                    name="firstName"
                    label={language.firstName}
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
                    label={language.lastName}
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
                    label={language.email}
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
                 <div style={{margin: 20, textAlign: 'center'}}>
                    <div style={{display: 'inline-block'}}>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            {language.continue}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerDetails);