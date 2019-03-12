
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import SwipeableViews from 'react-swipeable-views';


class Lightbox extends React.Component {

    render () {
        const { images, open, handleModalClose } = this.props;
        const { clientWidth, clientHeight } = document.documentElement;
        let imageWidth, imageHeight, imageVerticalMargin, imageHorizontalMargin;
        if (clientHeight < clientWidth) {
            imageHeight = clientHeight * 0.9;
            imageWidth = imageHeight;
        } else {
            imageWidth = clientWidth * 0.9;
            imageHeight = imageWidth;
        }
        imageVerticalMargin = (clientHeight - imageHeight) / 2;
        imageHorizontalMargin = (clientWidth -  imageWidth) / 2;

        return (
            <Modal
                style={{textAlign: 'center'}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open} 
                onClose={this.handleModalClose}
                className="numnums"
            >
                <div>
                    <Button 
                        onClick={handleModalClose}
                        style={{ color: '#fff', fontSize: '2em', position: 'absolute', right: 15, top: 15, zIndex: 1000 }}
                    >X</Button>
                    <SwipeableViews >
                        {images.map(image => 
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
        )
    }
}

export default Lightbox;