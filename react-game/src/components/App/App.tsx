import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameSettings from '../GameSettings/GameSettings';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
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
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Board} />
        <Route exact path="/settings" component={GameSettings} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
