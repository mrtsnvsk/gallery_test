export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Ввведите email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Некорректный email';
  }
  return error;
};
