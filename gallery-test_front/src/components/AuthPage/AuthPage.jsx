import React from 'react';
import * as yup from 'yup';
import { Field, Form, ErrorMessage, Formik } from 'formik';
import { Button, Grid, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authUser, authError } from '../../redux/actions/authActions';

const AuthPage = ({ authUser, authError, error }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <Formik
        initialValues={{
          phone: '',
          password: '',
        }}
        validationSchema={yup.object().shape({
          phone: yup
            .number()
            .typeError('Должно быть числом')
            .min(4, 'Короткий номер телефона')
            .required('Введите номер телефона'),
          password: yup
            .string()
            .min(6, 'Пароль не может быть меньше 6 символов')
            .required('Введите пароль'),
        })}
        onSubmit={(values) => authUser(values)}
      >
        <Form>
          <Typography
            color='textPrimary'
            gutterBottom
            variant='h4'
            align='center'
          >
            Authorization
          </Typography>
          <Grid item className={classes.fieldContainer}>
            <div className={classes.fieldLabel}>Номер телефона</div>
            <Field
              className={classes.field}
              name='phone'
              type='phone'
              placeholder='Номер телефона'
            />
            <p className={classes.errorMessage}>
              <ErrorMessage name='phone' />
            </p>
          </Grid>
          <Grid item className={classes.fieldContainer}>
            <div>Пароль</div>
            <Field
              className={classes.field}
              name='password'
              type='password'
              placeholder='Пароль'
              autoComplete='off'
            />
            <p className={classes.errorMessage}>
              <ErrorMessage name='password' />
            </p>
          </Grid>
          <Grid container justify='center'>
            <Button type='submit' variant='outlined' color='primary'>
              Войти
            </Button>
          </Grid>
          <Grid className={classes.authLink}>
            <span>Нет аккаунта?</span>
            &nbsp;
            <Link to='/registration'>Зарегистрироваться</Link>
          </Grid>
        </Form>
      </Formik>
      {error && setTimeout(() => authError(null), 3000) && (
        <Alert style={{ position: 'fixed', top: 0 }} severity='error'>
          {error}
        </Alert>
      )}
    </Grid>
  );
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: 500,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  field: {
    width: 250,
    height: 40,
    borderRadius: 5,
  },
  errorMessage: {
    position: 'absolute',
    color: 'red',
    fontSize: 12,
  },
  authLink: {
    marginTop: 20,
  },
});

const mapStateToProps = ({ error }) => {
  return {
    error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: (data) => dispatch(authUser(data)),
    authError: (data) => dispatch(authError(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
