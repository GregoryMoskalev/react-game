import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import languages from '../../languages/languages';
import './Score.scss';

const Score: React.FC = () => {
  const langContext = useContext(LanguageContext);
  const scoreList = JSON.parse(localStorage.getItem('bugsweeper-score-list')!) || [];
  const { difficulty, score, time, back } = languages[langContext!.lang];
  return (
    <div className="score">
      <h4 className="score-heading">{score}</h4>
      <div className="grid">
        <span className="score-heading">
          <strong>&nbsp;</strong>
        </span>
        <span>
          <strong className="score-heading">{difficulty}</strong>
        </span>
        <span>
          <strong className="score-heading">{time}</strong>
        </span>
        {scoreList.map((el: { timer: number; difficulty: string }, i: number) => {
          return (
            <Fragment key={i}>
              <span>{i}</span>
              <span>{el.difficulty}</span>
              <span>{el.timer}</span>
            </Fragment>
          );
        })}
      </div>
      <Link className="back-btn" to="/settings">
        {back}
      </Link>
    </div>
  );
};

export default Score;
