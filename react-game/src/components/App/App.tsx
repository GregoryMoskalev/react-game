import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import GameSettings from '../GameSettings/GameSettings';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import useStateAndLS from '../../hooks/useStateAndLS';
import './App.scss';

const changeDifficulty = (difficulty: number) => {
  const value = {
    rows: 0,
    columns: 0,
    bugs: 0,
  };

  switch (difficulty) {
    case 2:
      value.rows = 30;
      value.columns = 16;
      value.bugs = 99;
      break;
    case 1:
      value.rows = 16;
      value.columns = 16;
      value.bugs = 40;
      break;
    case 0:
      value.rows = 9;
      value.columns = 9;
      value.bugs = 10;
      break;
  }
  return value;
};

const App: React.FC = () => {
  const [audioVolume, setAudioVolumeState] = useStateAndLS(
    {
      sound: 0.5,
      music: 0,
    },
    'bugsweeper-audio-volume',
  );
  const [difficulty, setDifficulty] = useStateAndLS(changeDifficulty(0), 'bugsweeper-difficulty');
  const handleDifficultyChange = (n: number) => {
    localStorage.removeItem('bugsweeper-save');
    setDifficulty(changeDifficulty(n));
  };

  const handleVolumeChange = (s: number, m: number) => {
    setAudioVolumeState({
      sound: s,
      music: m,
    });
  };

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(props: any) => (
            <Board
              audioVolume={audioVolume}
              rows={difficulty.rows}
              columns={difficulty.columns}
              bugs={difficulty.bugs}
            />
          )}
        />
        <Route
          exact
          path="/settings"
          render={(props: any) => (
            <GameSettings
              audioVolume={audioVolume}
              handleVolumeChange={handleVolumeChange}
              bugs={difficulty.bugs}
              handleChange={(n) => handleDifficultyChange(n)}
            />
          )}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
