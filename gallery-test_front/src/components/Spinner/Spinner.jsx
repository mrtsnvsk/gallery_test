import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Spinner = () => {
  const classes = useStyles();

  return (
    <Grid container justify='center'>
      <CircularProgress className={classes.spinner} size={100} />
    </Grid>
  );
};

const useStyles = makeStyles({
  spinner: {
    marginTop: 150,
  },
});

export default Spinner;
