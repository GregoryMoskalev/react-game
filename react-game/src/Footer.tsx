import React, { Component } from 'react';
import rsLogo from './assets/rs_school_js.svg';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <a href="https://rs.school/react/" target="_blank" rel="noopener noreferrer">
          <img className="rs-logo" src={rsLogo} alt="rs school logo" />
        </a>
        <a href="https://github.com/GregoryMoskalev" target="_blank" rel="noopener noreferrer">
          Gregory Moskalev
        </a>
      </footer>
    );
  }
}

export default Footer;
