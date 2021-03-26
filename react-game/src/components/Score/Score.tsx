import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Score.scss';
import { fetchLeaders } from '../../api/leaderBoardApi'
import { usePromiseFn } from "../../commons/hooks";

const Score: React.FC = () => {
  const [scoreList, loading, error] = usePromiseFn(fetchLeaders)

  let scoreBody;
  if (loading) {
    scoreBody = <div className='loading-indicator'>
      Loading...
      <div className="lds-dual-ring"/>
    </div>
  } else if (error) {
    scoreBody = <div>An error has occurred, please try again later</div>
  } else {
    scoreBody = scoreList?.map((el, i) => (
      <Fragment key={i}>
        <span>{i + 1}</span>
        <span>{el.username}</span>
        <span>{el.difficulty}</span>
        <span>{el.timer}</span>
      </Fragment>
    ));
  }

  return (
    <div className="score">
      <h4 className="score-heading">Score</h4>
      <div className="grid">
        <span className="score-heading"><strong>#</strong></span>
        <span><strong className="score-heading">Name</strong></span>
        <span><strong className="score-heading">Difficulty</strong></span>
        <span><strong className="score-heading">Time</strong></span>
        {scoreBody}
      </div>
      <Link className="back-btn" to="/settings">
        Back
      </Link>
    </div>
  );
};

export default Score;
