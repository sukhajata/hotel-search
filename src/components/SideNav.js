import React from 'reactn';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';


class SideNav extends React.Component { 
    
    handleClick = () => {
        this.props.closeDrawer();
    }

    render() {
        const { classes, sideOpen } = this.props;
        const { language } = this.global;

        const side = (
            <div style={{width: 250}}>
                <div className={classes.header}>
                    <Typography  component="h1" variant="h6" className={classes.headerText}>
                                {language.title}
                    </Typography>
                </div>
                <Divider/>
                <div className={classes.list}>
                    <List>
                        <ListItem button className={classes.listMenuItem} onClick={this.handleClick}>
                            <Link className={classes.listLink} to="/">
                                <ListItemText primary={language.searchHotels}/> 
                            </Link>
                        </ListItem>
                        <Divider/>
                        <ListItem button className={classes.listMenuItem} onClick={this.handleClick}>
                            <Link className={classes.listLink} to="/list-hotels">
                                <ListItemText primary={language.listHotels}/> 
                            </Link>
                        </ListItem>
                       
                    </List>
                </div>
            </div>
        )

        return  (
            <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={this.props.container}
                variant="temporary"
                anchor="left"
                open={sideOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
              
                {side}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                style={{width: 250}}
                variant="permanent"
                open
              >
                {side}
              </Drawer>
            </Hidden>
          </nav>
        
        )
    }
}

export default withStyles(styles)(SideNav);
/*
 <Divider/>
                        <ListItem button className={classes.listMenuItem} onClick={this.handleClick}>
                            <Link className={classes.listLink} to="/add-hotel/">
                                <ListItemText primary={language.addHotel}/>
                            </Link>
                        </ListItem>
<Grid container className={classes.header}>
                    <Grid item>
                        <Typography  component="h1" variant="h6" className={classes.headerText}>
                            {language.title}
                        </Typography>
                    </Grid>
                </Grid>
                */
/*
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
        */