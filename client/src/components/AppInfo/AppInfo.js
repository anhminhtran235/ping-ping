import React, { Component } from 'react';
import Aux from '../hoc/Auxiliary';
import axios from 'axios';
import classes from './AppInfo.module.css';

class AppInfo extends Component {
  state = {
    appCount: null,
    starCount: null,
  };
  async componentDidMount() {
    try {
      const res = await axios.get('/api/appUrl/count');
      this.setState({ appCount: res.data });
    } catch (err) {
      console.error(err);
    }
    try {
      const res = await axios.get(
        'https://api.github.com/repos/anhminhtran235/ping-ping'
      );
      const starCount = res.data.stargazers_count;
      this.setState({ starCount });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    let websiteCount = null;
    let starCount = null;
    if (this.state.appCount) {
      websiteCount = (
        <p>
          Trusted by <strong>{this.state.appCount}</strong> websites
        </p>
      );
    }
    if (this.state.starCount) {
      starCount = (
        <a
          className={classes.noLink}
          href='https://github.com/anhminhtran235/ping-ping/stargazers'
        >
          {this.state.starCount}
        </a>
      );
    }
    return (
      <Aux>
        {websiteCount}
        <div>
          Github: {'  '}
          <a href='https://github.com/anhminhtran235/ping-ping'>
            <i class='fab fa-github'></i>
          </a>
          {'  '}
          {starCount}
        </div>
      </Aux>
    );
  }
}

export default AppInfo;
