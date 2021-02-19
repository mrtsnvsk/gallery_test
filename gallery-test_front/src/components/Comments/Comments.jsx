import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { uploadComments } from '../../redux/actions/commentsActions';
import Images from '../Images';
import Spinner from '../Spinner';

const Comments = ({ currentImage, currentImageComments, uploadComments }) => {
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    uploadComments(id);
  }, [uploadComments, id]);

  return (
    <>
      {currentImage ? (
        <Grid
          container
          container
          justify='center'
          className={classes.container}
        >
          <Grid item xs={3}>
            <Images
              login={currentImage.login}
              location={currentImage.location}
              image={currentImage.image}
              _id={currentImage._id}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h3'>Comments</Typography>
            {currentImageComments.length > 0 ? (
              currentImageComments.map((el, idx) => {
                return (
                  <Grid
                    container
                    wrap='nowrap'
                    className={classes.commentContent}
                    key={idx}
                  >
                    <Grid className={classes.avatar}>
                      <Avatar>{el.login[0]}</Avatar>
                    </Grid>
                    <Grid className={classes.commentData}>
                      <Grid className={classes.commentLogin}>{el.login}</Grid>
                      <Grid className={classes.commentText}>{el.comment}</Grid>
                    </Grid>
                  </Grid>
                );
              })
            ) : (
              <Typography variant='h6'>Комментарии отсутствуют...</Typography>
            )}
          </Grid>
        </Grid>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const mapStateToProps = ({ images, currentImage, currentImageComments }) => {
  return {
    images,
    currentImage,
    currentImageComments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadComments: (id) => dispatch(uploadComments(id)),
  };
};

const useStyles = makeStyles({
  container: {
    marginTop: 20,
  },
  commentContent: {
    margin: 15,
    marginLeft: 0,
    flexWrap: 'no-wrap',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 5,
  },
  commentContent: {
    marginTop: 10,
    border: '1px solid grey',
    borderRadius: 5,
  },
  commentLogin: {
    marginBottom: 5,
    color: 'grey',
  },
  commentText: {
    fontSize: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
