import { Settings } from 'http2';
import React, { useState } from 'react';

interface SettingsProps {
  handleClick: any;
}

const BoardSettings: React.FC<SettingsProps> = (props) => {
  return (
    <React.Fragment>
      <button onClick={props.handleClick(2)}>change d</button>
    </React.Fragment>
  );
};

export default BoardSettings;
