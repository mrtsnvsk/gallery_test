import React, { useEffect } from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { uploadImages } from '../../redux/actions/imagesActions';
import Images from '../Images';
import Spinner from '../Spinner';

const Gallery = ({ images, uploadImages }) => {
  useEffect(() => {
    uploadImages();
  }, []);

  return (
    <div>
      <Container>
        <Typography
          color='textPrimary'
          gutterBottom
          variant='h2'
          align='center'
        >
          Gallery
        </Typography>
        <Grid container spacing={3}>
          {images ? (
            images.map((el, idx) => {
              return (
                <Images
                  key={idx}
                  login={el.login}
                  location={el.location}
                  image={el.image}
                  _id={el._id}
                />
              );
            })
          ) : (
            <Spinner />
          )}
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ images }) => {
  return {
    images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImages: () => dispatch(uploadImages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
