import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { displayMessage } from '../../store/action';
import classes from './UserOption.module.css';

class UserOptions extends Component {
  state = {
    form: {
      url: '',
      interval: '20m',
      sleepFrom: 0,
      sleepTo: 0,
    },
  };

  onInputChange = (e) => {
    const newForm = { ...this.state.form };
    newForm[e.target.name] = e.target.value;
    this.setState({
      form: newForm,
    });
  };

  onSubmit = async (e) => {
    if (this.validateForm(this.state.form)) {
      const formToSubmit = {
        url: this.state.form.url,
        updateEverySeconds: this.intervalToSeconds(this.state.form.interval),
        ignoreFrom: this.state.form.sleepFrom,
        ignoreTo: this.state.form.sleepTo,
      };
      console.log(formToSubmit);
      try {
        await axios.post('/api/appUrl', formToSubmit);
      } catch (err) {
        console.error(err);
      }
    } else {
      e.preventDefault();
    }
  };

  onDeleteUrl = async (e) => {
    try {
      const url = encodeURIComponent(this.state.form.url);
      console.log('url', url);
      await axios.delete('/api/appUrl/' + url);
    } catch (err) {
      console.error(err);
    }
  };

  validateForm(form) {
    try {
      new URL(form.url);
    } catch (err) {
      this.props.displayMes('Invalid Url', 'error');
      return false;
    }
    return true;
  }

  intervalToSeconds(interval) {
    if (interval === '20m') return 20 * 60;
    else if (interval === '30m') return 30 * 60;
    else if (interval === '1h') return 60 * 60;
    else if (interval === '2h') return 2 * 60 * 60;
    else if (interval === '3h') return 3 * 60 * 60;
    else if (interval === '6h') return 6 * 60 * 60;
    else if (interval === '12h') return 12 * 60 * 60;
    else if (interval === '1d') return 24 * 60 * 60;
    else if (interval === '2d') return 2 * 24 * 60 * 60;
    else if (interval === '3d') return 3 * 24 * 60 * 60;
    else throw new Error('Interval ' + interval + ' is invalid');
  }

  render() {
    return (
      <form>
        <div className={classes.inputLine}>
          <p className={classes.largeText}>Your url</p>
          <input
            type='text'
            placeholder='Enter your url'
            id='url'
            value={this.state.form.url}
            onChange={(e) => this.onInputChange(e)}
            name='url'
            className={classes.largeInput}
          />
        </div>
        <div className={classes.inputLine}>
          <p>Ping every</p>
          <select
            name='Ping every'
            value={this.state.form.interval}
            onChange={(e) => this.onInputChange(e)}
            name='interval'
            className={classes.narrowInput}
          >
            <option value='20m'> 20 minutes</option>
            <option value='30m'> 30 minutes</option>
            <option value='1h'> 1 hour</option>
            <option value='2h'> 2 hours</option>
            <option value='3h'> 3 hours</option>
            <option value='6h'> 6 hours</option>
            <option value='12h'> 12 hours</option>
            <option value='1d'> 1 day</option>
            <option value='2d'> 2 days</option>
            <option value='3d'> 3 days</option>
          </select>
        </div>
        <div className={classes.inputLine}>
          <p>Bed time</p>
          <input
            type='number'
            max='24'
            min='0'
            value={this.state.form.sleepFrom}
            onChange={(e) => this.onInputChange(e)}
            name='sleepFrom'
          />{' '}
          to{' '}
          <input
            type='number'
            max='24'
            min='0'
            value={this.state.form.sleepTo}
            onChange={(e) => this.onInputChange(e)}
            name='sleepTo'
          />{' '}
          GMT
        </div>

        <br />
        <button onClick={this.onSubmit} className={classes.btnSuccess}>
          Keep me awake!
        </button>
        {'  '}
        <button onClick={this.onDeleteUrl} className={classes.btnDanger}>
          Remove my app
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    displayMes: (message, type) => displayMessage(dispatch, message, type),
  };
};

export default connect(null, mapDispatchToProps)(UserOptions);
