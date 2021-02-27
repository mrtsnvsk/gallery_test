import React from 'react';
import * as yup from 'yup';
import { Field, Form, ErrorMessage, Formik } from 'formik';
import { Button, Grid, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  authError,
  regSuccess,
  registrationUser,
} from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/validateEmail';

const RegistrationPage = ({
  authSuccess,
  regSuccess,
  authError,
  error,
  registrationUser,
}) => {
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
          email: '',
          login: '',
          phone: '',
          password: '',
        }}
        validationSchema={yup.object().shape({
          email: yup.string().required('Введите адресс электронной почты'),
          login: yup
            .string()
            .required('Введите логин')
            .min(2, 'Слишком короткий логин')
            .max(18, 'Слишком длинный логин'),
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
        onSubmit={(values) => registrationUser(values)}
      >
        <Form>
          <Typography
            color='textPrimary'
            gutterBottom
            variant='h4'
            align='center'
          >
            Registration
          </Typography>
          <Grid item className={classes.fieldContainer}>
            <div className={classes.fieldLabel}>E-mail</div>
            <Field
              className={classes.field}
              name='email'
              type='email'
              placeholder='E-mail'
              validate={validateEmail}
            />
            <p className={classes.errorMessage}>
              <ErrorMessage name='email' />
            </p>
          </Grid>
          <Grid item className={classes.fieldContainer}>
            <div className={classes.fieldLabel}>Логин</div>
            <Field
              className={classes.field}
              name='login'
              type='text'
              placeholder='Логин'
            />
            <p className={classes.errorMessage}>
              <ErrorMessage name='login' />
            </p>
          </Grid>

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
              Регистрация
            </Button>
          </Grid>
          <Grid container justify='center' className={classes.registerLink}>
            <span>Есть аккаунт?</span>
            &nbsp;
            <Link to='/login'>Авторизироваться</Link>
          </Grid>
        </Form>
      </Formik>
      {error && setTimeout(() => authError(null), 3000) && (
        <Alert style={{ position: 'fixed', top: 0 }} severity='error'>
          {error}
        </Alert>
      )}
      {authSuccess && setTimeout(() => regSuccess(null), 5000) && (
        <Alert style={{ position: 'fixed', top: 0 }} severity='success'>
          {authSuccess}
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
    width: 300,
    height: 40,
    borderRadius: 5,
  },
  errorMessage: {
    position: 'absolute',
    color: 'red',
    fontSize: 12,
  },
  registerLink: {
    marginTop: 20,
  },
});

const mapStateToProps = ({ authSuccess, error }) => {
  return {
    authSuccess,
    error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authError: (data) => dispatch(authError(data)),
    regSuccess: (message) => dispatch(regSuccess(message)),
    registrationUser: (data) => dispatch(registrationUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
