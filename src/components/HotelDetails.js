import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Launch from '@material-ui/icons/Launch';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Lightbox from './Lightbox';
import MapComponent from './MapComponent';

import styles from '../styles';
import keys from '../config/keys';
import magnify from '../img/magnify.jpg';

import { getHotel, getHotelRooms, getHotelPhotos } from '../services/api';
import { getDistance } from '../services/utils';

class HotelDetails extends React.Component {

    state = {
        hotel: {},
        rooms: [],
        hotelPhotos: [],
        lightboxImages: [],
        popperOpen: false,
        distance: 0,
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const rooms = await getHotelRooms(id);
        const hotels = await getHotel(id);
        const hotel = hotels[0];
        const hotelPhotos = await getHotelPhotos(id);
        const distance = getDistance(parseFloat(hotel.latitude), parseFloat(hotel.longitude));
        this.setState({
            hotel: hotel,
            rooms,
            hotelPhotos,
            distance,
        })
    }

    handleClick = id => {

    }

    selectRoom = id => {
        const { arrive, depart } = this.props.match.params;
        this.props.history.push('/confirm/' + arrive + '/' + depart + "/" + id + "/");
    }

    handleModalOpen = (images) => {
        this.setState({ 
            lightboxImages: images,
            popperOpen: true 
        });
    }

    handleModalClose = () => {
        this.setState({ popperOpen: false })
    }


    render() {
        const { classes } = this.props;
        const { hotel, rooms, hotelPhotos, popperOpen, lightboxImages, distance } = this.state;
        const mapUrl = "https://maps.googleapis.com/maps/api/js?key=" + keys.GOOGLE_MAPS_API_KEY + "&v=3.exp&libraries=geometry,drawing,places";

        return (
            <div className={classes.content} >
                <Lightbox 
                    images={lightboxImages} 
                    open={popperOpen}
                    handleModalClose={this.handleModalClose}
                />
                <div className={classes.headerHotel} >
                {hotelPhotos.length > 0 &&
                    <GridList cols={2} onClick={() => this.handleModalOpen(hotelPhotos)}>
                    {hotelPhotos.map(image => 
                        <GridListTile key={image.image_name}>
                            <img 
                                alt={image.image_name} 
                                src={"https://sukhajata.com/h/img/small/" + image.image_name}
                            />
                        </GridListTile>
                    )}
                        <GridListTile key="magnify">
                            <img src={magnify} alt="numnums"/>
                        </GridListTile>
                    </GridList>
                }
                    <div style={{ margin: 10 }}>
                        <Typography variant="h5">
                            {hotel.name_english}
                        </Typography>
                        <Typography variant="h5">
                            {hotel.name_thai}
                        </Typography>
                        <Typography variant="h6">
                            {distance}km from Khemmarat
                        </Typography>
                    </div>
                    {hotel.latitude &&
                    <MapComponent
                        googleMapURL={mapUrl}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `250px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        onPlaceFound={this.onPlaceFound}
                        start={{latitude: hotel.latitude, longitude: hotel.longitude}}
                        />
                    }
                    <div style={{margin: 10}}>
                        <Typography variant="h6">
                            {hotel.address_english + " " + hotel.tambon_english}
                        </Typography>
                        <Typography variant="h6">
                            {hotel.address_thai + " " + hotel.tambon_thai}
                        </Typography>
                    </div>

                </div>
                <div style={{backgroundColor: '#f2f2f2', paddingTop: 5}}>
                {rooms.map(n => 
                <Paper style={{ margin: 15 }} key={n.id} onClick={this.popup}>
                    <Grid container direction='row' spacing={8} onClick={() => this.handleClick(n.room_id)}>
                        <Grid item>
                        {n.images.length > 0 &&
                            <React.Fragment>
                                <div style={{position: 'relative'}} onClick={() => this.handleModalOpen(n.images)}>
                                    <img key={n.images[0].image_name} style={{height:200, width: 200 }}
                                        src={"https://sukhajata.com/h/img/small/" + n.images[0].image_name}
                                        alt="Nice to see everyone"
                                    />
                                    <Launch 
                                        style={{color: '#fff', position: 'absolute', bottom: 5, right: 5}}
                                        onClick={() => this.handleModalOpen(n.images)}
                                    />
                                </div>

                            </React.Fragment>
                        }
                        </Grid>

                        <Grid item>
                            <Typography variant="body1" style={{ paddingTop: 15, paddingLeft: 15 }}>
                                {n.name_english}
                            </Typography>
                            <Typography variant="body1" style={{ paddingLeft: 15 }}>
                                {n.name_thai}
                            </Typography>
                            <Typography variant="body1" style={{ padding: 15 }}>
                                {n.price}฿
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.selectRoom(n.id)}
                            >
                                Select / เลือก
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                )}
                </div>
            </div>      
        )
    }
}

export default withStyles(styles)(HotelDetails);
/*
 <Modal
                                    style={{textAlign: 'center'}}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={popperOpen} 
                                    onClose={this.handleModalClose}
                                    className="numnums"
                                >
                                    <div>
                                    <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={this.handleModalClose}
                                            style={{ position: 'absolute', right: 15, top: 15, zIndex: 1000 }}
                                        >X</Button>
                                        
                                        <SwipeableViews >
                                            {n.images.map(image => 
                                                <img key={image.image_name} 
                                                    style={{ 
                                                        width: imageWidth, 
                                                        height: imageHeight, 
                                                        paddingTop: imageVerticalMargin,
                                                        marginBottom: imageVerticalMargin,
                                                        marginLeft: imageHorizontalMargin,
                                                        marginRight: imageHorizontalMargin
                                                    }}
                                                    src={"https://sukhajata.com/h/img/full/" + image.image_name}
                                                    alt="Nice to see everyone"
                                                />
                                            )}
                                        </SwipeableViews>
                                    </div>
                                </Modal>
                                */