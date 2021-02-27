import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Avatar,
  Grid,
  Typography,
  TextareaAutosize,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import {
  uploadComments,
  newComment,
} from '../../redux/actions/commentsActions';
import Images from '../Images';
import Spinner from '../Spinner';

const Comments = ({
  currentImage,
  currentImageComments,
  uploadComments,
  currentUser,
  newComment,
}) => {
  const classes = useStyles();
  const { id } = useParams();
  const [comment, setComment] = useState('');

  useEffect(() => {
    uploadComments(id);
  }, [id]);

  const addNewComment = (e) => {
    const data = {
      login: currentUser.login,
      imageId: currentImage._id,
      comment,
    };
    newComment(data);
    setComment('');
  };

  return (
    <>
      {currentImage ? (
        <Grid
          container
          justify='center'
          align='center'
          className={classes.container}
        >
          <Grid item sm={4} xs={12}>
            <Images
              login={currentImage.login}
              location={currentImage.location}
              image={currentImage.image}
              _id={currentImage._id}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Typography variant='h3'>Comments</Typography>
            <Grid
              className={classes.newCommentContainer}
              container
              direction='column'
            >
              <Typography variant='h6'>Добавить комментарий</Typography>
              <Grid>
                <TextareaAutosize
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  className={classes.newCommentArea}
                  rowsMin={3}
                  aria-label='maximum height'
                  placeholder='Оставьте комментарий'
                />
              </Grid>

              <Grid className={classes.postComment} container justify='center'>
                {' '}
                <Button
                  onClick={(e) => addNewComment(e)}
                  variant='contained'
                  color='primary'
                >
                  Добавить
                </Button>
              </Grid>
            </Grid>
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

const mapStateToProps = ({
  images,
  currentImage,
  currentImageComments,
  currentUser,
}) => {
  return {
    images,
    currentImage,
    currentImageComments,
    currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadComments: (id) => dispatch(uploadComments(id)),
    newComment: (data) => dispatch(newComment(data)),
  };
};

const useStyles = makeStyles({
  container: {
    marginTop: 20,
  },
  newCommentContainer: {
    width: 320,
    border: '1px solid gray',
    padding: 5,
  },

  commentContent: {
    width: 300,
    marginTop: 20,
    marginLeft: 0,
    border: '1px solid grey',
    borderRadius: 5,
    flexWrap: 'no-wrap',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 5,
  },
  commentLogin: {
    marginBottom: 5,
    color: 'grey',
  },
  commentText: {
    fontSize: 16,
  },
  newCommentArea: {
    width: 300,
    marginTop: 10,
  },
  postComment: {
    marginTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
