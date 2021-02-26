import React from 'react';
import rsLogo from '../../assets/rs_school_js.svg';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <p>
        Built during{' '}
        <a href="https://rs.school/react/" target="_blank" rel="noopener noreferrer">
          <img className="rs-logo" src={rsLogo} alt="rs school logo" />
        </a>{' '}
        online course by&nbsp;
        <a href="https://github.com/GregoryMoskalev" target="_blank" rel="noopener noreferrer">
          Gregory Moskalev
        </a>. 2021
      </p>
    </footer>
  );
};

export default Footer;
