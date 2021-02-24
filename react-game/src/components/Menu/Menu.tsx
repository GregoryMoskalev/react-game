import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

const Menu = () => {
  return (
    <Fragment>
      <Link to="/play">Play</Link>
      <Link to="/settings">Settings</Link>
    </Fragment>
  );
};

export default Menu;
