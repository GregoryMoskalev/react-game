import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import Text from "../Text";

import "./Score.scss";

const Score: React.FC = () => {
  const scoreList = JSON.parse(localStorage.getItem("bugsweeper-score-list")!) || [];
  return (
    <div className="score">
      <h4 className="score-heading">
        <Text id="score" />
      </h4>
      <div className="grid">
        <span className="score-heading">
          <strong>&nbsp;</strong>
        </span>
        <span>
          <strong className="score-heading">
            <Text id="difficulty" />
          </strong>
        </span>
        <span>
          <strong className="score-heading">
            <Text id="time" />
          </strong>
        </span>
        {scoreList.map((el: {timer: number; difficulty: string}, i: number) => {
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
        <Text id="back" />
      </Link>
    </div>
  );
};

export default Score;
