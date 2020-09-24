import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlertMessage from './AlertMessage/AlertMessage';

class AlertMessages extends Component {
  render() {
    return this.props.messages.map((mes) => {
      return (
        <AlertMessage key={mes.id} message={mes.message} type={mes.type} />
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(AlertMessages);
