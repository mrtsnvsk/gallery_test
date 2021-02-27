import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  Dialog,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/authActions';
import { uploadNewImage } from '../../redux/actions/imagesActions';

const Header = ({ logoutUser, currentUser, uploadNewImage }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let formData = new FormData();

  const checkFile = (e) => {
    formData.append('image', e.target.files[0]);
    formData.append('imageOwner', currentUser.login);
    formData.append('location', 'Stockgolm, Shweden');
    uploadNewImage(formData);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.link} to='/gallery'>
              Gallery
            </Link>
          </Typography>
          <Tooltip title='Add photo' placement='bottom'>
            <AddCircleIcon
              onClick={handleClickOpen}
              className={classes.addIcon}
            />
          </Tooltip>
          <Button onClick={logoutUser} color='inherit'>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Grid container justify='center'>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Grid
                  className={classes.fileUpload}
                  container
                  direction='column'
                  align='center'
                >
                  <Typography className={classes.newPhotoLabel} variant='h6'>
                    Добавьте новую фотографию
                  </Typography>
                  <form encType='multipart/form-data'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => checkFile(e)}
                    />
                  </form>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  addIcon: {
    marginRight: 10,
    cursor: 'pointer',
    color: 'white',
    '&:hover': {
      color: 'red',
    },
  },
  newPhotoLabel: {
    marginBottom: 20,
  },
}));

const mapStateToProps = ({ currentUser }) => {
  return {
    currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    uploadNewImage: (formData) => dispatch(uploadNewImage(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
