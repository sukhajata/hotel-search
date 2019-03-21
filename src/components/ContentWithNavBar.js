import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from './NavBar';
import SideNav from './SideNav';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class ContentWithNavBar extends React.Component {

    state = {
        sideOpen: false,
    }

    toggleDrawer = (open) => () => {
        this.setState({
          sideOpen: open,
        });
    }

    openDrawer = () => {
        this.setState({ sideOpen: true });
    }

    closeDrawer = () => {
        this.setState({ sideOpen: false });
    }

    render() {
        const { children, classes } = this.props;
        const { sideOpen } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <SideNav 
                    sideOpen={sideOpen}
                    toggleDrawer={this.toggleDrawer}
                    closeDrawer={this.closeDrawer}
                />
                <NavBar 
                    toggleDrawer={this.toggleDrawer}
                    title={this.props.title}
                />
                <div className={classes.content}>
                    {children}
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ContentWithNavBar);