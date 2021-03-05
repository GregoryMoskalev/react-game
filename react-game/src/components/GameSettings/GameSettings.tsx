import React from 'react';
import { Link } from 'react-router-dom';
import './GameSettings.scss';
import { connect } from 'react-redux';
import settingActions from '../../store/settingActions';

type DispatchProps = typeof settingActions;
type StateProps = {
  audioVolume: {
    sound: number;
    music: number;
  };
  difficulty: string;
}

const GameSettings: React.FC<DispatchProps & StateProps> = (props) => {
  const {onDifficultyChange, onVolumeSettingChange} = props;

  return (
    <React.Fragment>
      <div className="radio-group difficulty">
        <h4 className="settings-heading">Difficulty</h4>
        <div className="radio-button">
          <input
            checked={props.difficulty === "junior"}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="radio-input"
            type="radio"
            id="difficultyEasy"
            name="difficulty"
            value="junior"
          />
          <label className="radio-label easy" htmlFor="difficultyEasy">
            Easy
          </label>
        </div>
        <div className="radio-button">
          <input
            checked={props.difficulty === "middle"}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="radio-input"
            type="radio"
            id="difficultyMedium"
            name="difficulty"
            value="middle"
          />
          <label className="radio-label medium" htmlFor="difficultyMedium">
            Medium
          </label>
        </div>
        <div className="radio-button">
          <input
            checked={props.difficulty === "senior"}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="radio-input"
            type="radio"
            id="difficultyExpert"
            name="difficulty"
            value="senior"
          />
          <label className="radio-label expert" htmlFor="difficultyExpert">
            Expert
          </label>
        </div>
      </div>
      <div>
        <h4 className="settings-heading">Audio settings</h4>
        <div>
          <label htmlFor="sound">Sound</label>
          <input
            value={props.audioVolume.sound}
            onChange={(e) => onVolumeSettingChange("sound", Number(e.target.value))}
            type="range"
            step="0.1"
            id="sound"
            name="sound"
            min="0"
            max="1"
          />
        </div>
        <div>
          <label htmlFor="music">Music</label>
          <input
            value={props.audioVolume.music}
            onChange={(e) => onVolumeSettingChange("music", Number(e.target.value))}
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

const mapStateToProps: (state: any) => StateProps = (state) => ({
  audioVolume: state.settings.audioVolume,
  difficulty: state.settings.difficulty,
});
export default connect(mapStateToProps, settingActions)(GameSettings);
