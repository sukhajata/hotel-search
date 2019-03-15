import React from 'reactn';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
  } from '../services/utils';


class CreditDetails extends React.Component {

    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        focused: '',
        issuer: '',
    }


    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
          this.setState({ issuer });
        }
      };
    
      handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
        });
      };
    
      handleInputChange = ({ target }) => {
        if (target.name === 'number') {
          target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
          target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
          target.value = formatCVC(target.value);
        }
    
        this.setState({ [target.name]: target.value });
      };
    
      handleSubmit = () => {
        /*e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
          .filter(d => d.name)
          .reduce((acc, d) => {
            acc[d.name] = d.value;
            return acc;
          }, {});
    
        this.setState({ formData });*/
          this.props.history.push('/completed/')

        this.form.reset();

      };

    render() {
        const{ classes } = this.props;
        const { number, name, expiry, cvc, focused, issuer } = this.state;
        const { language, lanCode } = this.global;

        return (
            <div>
                <Cards
                    number={number}
                    name={name}
                    expiry={expiry}
                    cvc={cvc}
                    focused={focused}
                />
                <form className={classes.container} ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                    <TextField
                        name="number"
                        label={language.number}
                        pattern="[\d| ]{16,22}"
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
                        name="name"
                        label={language.nameOnCard}
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
                        name="expiry"
                        label={language.expiry}
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
                        name="cvc"
                        label="CVCุ"
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
                    <input type="hidden" name="issuer" value={issuer} />

                    <div style={{margin: 20, textAlign: 'center'}}>
                        <div style={{display: 'inline-block'}}>
                            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                {language.pay}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    
}

export default withStyles(styles)(CreditDetails);

/*

                */