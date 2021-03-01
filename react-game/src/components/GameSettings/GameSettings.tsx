import React, { FormEvent, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import languages from '../../languages/languages';
import { LanguageContext } from '../../contexts/LanguageContext';
import { MineThemeContext } from '../../contexts/MineThemeContext';
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
  const langContext = useContext(LanguageContext);
  const MineTheme = useContext(MineThemeContext);

  return (
    <React.Fragment>
      <div
        className="radio-group difficulty"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.handleChange(Number(e.target.value))}
      >
        <h4 className="settings-heading">{languages[langContext!.lang].difficulty}</h4>
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
            {languages[langContext!.lang].easyDifficulty}
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
            {languages[langContext!.lang].mediumDifficulty}
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
            {languages[langContext!.lang].expertDifficulty}
          </label>
        </div>
      </div>
      <div className="radio-group volume">
        <h4 className="settings-heading">{languages[langContext!.lang].audioSettings}</h4>
        <div
          className="sound-volume"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.handleVolumeChange(Number(e.target.value), props.audioVolume.music)}
        >
          <label htmlFor="sound">{languages[langContext!.lang].soundVolume}</label>
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
          className="music-volume"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.handleVolumeChange(props.audioVolume.sound, Number(e.target.value))}
        >
          <label htmlFor="music">{languages[langContext!.lang].musicVolume}</label>
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
      <div
        className="radio-group language"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          langContext!.changeLang(e.target.value)}
      >
        <h4 className="settings-heading">{languages[langContext!.lang].languageSettings}</h4>
        <div className="radio-button">
          <input
            defaultChecked={langContext!.lang === 'en'}
            className="radio-input"
            type="radio"
            id="langEn"
            name="lang"
            value="en"
          />
          <label className="radio-label lang-en" htmlFor="langEn">
            🇬🇧 English
          </label>
        </div>
        <div className="radio-button">
          <input
            defaultChecked={langContext!.lang === 'ru'}
            className="radio-input"
            type="radio"
            id="langRu"
            name="lang"
            value="ru"
          />
          <label className="radio-label lang-ru" htmlFor="langRu">
            🇷🇺 Русский
          </label>
        </div>
      </div>
      <h4 className="settings-heading">{languages[langContext!.lang].mineTheme}</h4>
      <label className="switch">
        <input
          defaultChecked={MineTheme.mine === 'bug'}
          onChange={() => MineTheme.changeMineTheme()}
          type="checkbox"
        />
        <span className="slider round material-icons" />
      </label>
      <Link className="play-btn" to="/">
        {languages[langContext!.lang].playBtn}
      </Link>
    </React.Fragment>
  );
};

export default GameSettings;
