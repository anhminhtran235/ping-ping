import React from 'react';
import classes from './AlertMessage.module.css';

const message = (props) => {
  let style = [classes.banner];
  if (props.type === 'success') {
    style.push(classes.success);
  } else {
    style.push(classes.error);
  }
  return <p className={style.join(' ')}>{props.message}</p>;
};

export default message;
