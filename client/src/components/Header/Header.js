import React, { Fragment } from 'react';
import './Header.module.css';

const header = () => {
  return (
    <Fragment>
      <h1 style={{ display: 'inline' }}>Wake up, App! {'  '}</h1>
      <i
        style={{ color: 'rgb(28, 233, 28)' }}
        class='fas fa-bell fa-3x'
      ></i>{' '}
      <i style={{ color: 'rgb(28, 233, 28)' }} class='fas fa-bell fa-3x'></i>{' '}
      <i style={{ color: 'rgb(28, 233, 28)' }} class='fas fa-bell fa-3x'></i>
      <h2>
        Ping-ping <strong>pings your app</strong> to keep it awake
      </h2>
      <div style={{ marginBottom: '50px' }}></div>
    </Fragment>
  );
};

export default header;
