import React, { useState } from 'react';

interface GameSettingsProps {
  handleChange: (arg0: number) => void;
}

const GameSettings: React.FC<GameSettingsProps> = (props) => {
  return (
    <React.Fragment>
      <div>wow such settings</div>
      <button onClick={() => props.handleChange(0)}>change 0</button>
      <button onClick={() => props.handleChange(1)}>change 1</button>
      <button onClick={() => props.handleChange(2)}>change 2</button>
    </React.Fragment>
  );
};

export default GameSettings;
