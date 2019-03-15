import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import styles from '../styles';

import Languages from './Languages';

import thaiFlag from '../img/thai-flag.png';
import britishFlag from '../img/british-flag-new.png';

class NavBar extends React.Component { 
    
    handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            this.props.history.push('/search/' + event.target.value);
        }
    }

    render () {
        const { classes, toggleDrawer, title } = this.props;
        
        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {title}
                    </Typography>
                    <Languages />
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(NavBar);