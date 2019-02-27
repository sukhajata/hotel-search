import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class SideNav extends React.Component { 
    
    handleClick = () => {
        this.props.closeDrawer();
    }

    render() {
        const { classes, sideOpen, toggleDrawer } = this.props;

        return  (
            <SwipeableDrawer
                open={sideOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            > 
                <div
                    tabIndex={0}
                    role="button"
                >
                    <Grid container className={classes.header}>
                        <Grid item>
                            <Typography  component="h1" variant="h6" className={classes.headerText}>
                                Hotels Khemarat
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <div className={classes.list}>
                        <List>
                            <ListItem button className={classes.listMenuItem} onClick={this.handleClick}>
                                <Link className={classes.listLink} to="/">
                                    <ListItemText primary="Search Hotels"/> 
                                </Link>
                            </ListItem>
                            <Divider/>
                            <ListItem button className={classes.listMenuItem} onClick={this.handleClick}>
                                <Link className={classes.listLink} to="/list-hotels">
                                    <ListItemText primary="Hotels"/> 
                                </Link>
                            </ListItem>
                            <Divider/>
                            <ListItem button className={classes.listMenuItem} onClick={this.handleClick}>
                                <Link className={classes.listLink} to="/add-hotel/">
                                    <ListItemText primary="Add Hotel"/>
                                </Link>
                            </ListItem>
                        </List>
                    </div>
                </div>
        </SwipeableDrawer>
        
        )
    }
}

export default withStyles(styles)(SideNav);