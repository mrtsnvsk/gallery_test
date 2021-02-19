import React from 'react';
import { Card, CardMedia, CardHeader, Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const Images = ({ image, login, location, _id }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {login[0]}
            </Avatar>
          }
          title={login}
          subheader={location}
        />
        <Link to={`/image/${_id}`}>
          <CardMedia
            className={classes.media}
            image={`http://localhost:8080/static/${image}`}
          />
        </Link>
      </Card>
    </Grid>
  );
};

const useStyles = makeStyles({
  card: {
    width: 320,
    height: 350,
    boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
    backgroundColor: '#fafafa',
  },
  media: {
    width: '100%',
    height: '80%',
  },
  avatar: {
    backgroundColor: 'red',
  },
});

export default Images;
