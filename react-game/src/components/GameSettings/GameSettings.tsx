import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './GameSettings.scss';

interface GameSettingsProps {
  audioVolume: {
    sound: number;
    music: number;
  };
  handleVolumeChange: (sound: number, music: number) => void;
  bugs: number;
  handleChange: (arg0: number) => void;
}

const GameSettings: React.FC<GameSettingsProps> = (props) => {
  return (
    <React.Fragment>
      <div
        className="radio-group difficulty"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.handleChange(Number(e.target.value))}
      >
        <h4 className="settings-heading">Difficulty</h4>
        <div className="radio-button">
          <input
            defaultChecked={props.bugs === 10}
            className="radio-input"
            type="radio"
            id="difficultyEasy"
            name="difficulty"
            value="0"
          />
          <label className="radio-label easy" htmlFor="difficultyEasy">
            Easy
          </label>
        </div>
        <div className="radio-button">
          <input
            defaultChecked={props.bugs === 40}
            className="radio-input"
            type="radio"
            id="difficultyMedium"
            name="difficulty"
            value="1"
          />
          <label className="radio-label medium" htmlFor="difficultyMedium">
            Medium
          </label>
        </div>
        <div className="radio-button">
          <input
            defaultChecked={props.bugs === 99}
            className="radio-input"
            type="radio"
            id="difficultyExpert"
            name="difficulty"
            value="2"
          />
          <label className="radio-label expert" htmlFor="difficultyExpert">
            Expert
          </label>
        </div>
      </div>
      <div>
        <h4 className="settings-heading">Audio settings</h4>
        <div
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.handleVolumeChange(Number(e.target.value), props.audioVolume.music)}
        >
          <label htmlFor="sound">Sound</label>
          <input
            defaultValue={props.audioVolume.sound}
            type="range"
            step="0.1"
            id="sound"
            name="sound"
            min="0"
            max="1"
          />
        </div>
        <div
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.handleVolumeChange(props.audioVolume.sound, Number(e.target.value))}
        >
          <label htmlFor="music">Music</label>
          <input
            defaultValue={props.audioVolume.music}
            type="range"
            step="0.1"
            id="music"
            name="music"
            min="0"
            max="1"
          />
        </div>
      </div>
      <Link className="play-btn" to="/">
        Play
      </Link>
    </React.Fragment>
  );
};

export default GameSettings;
