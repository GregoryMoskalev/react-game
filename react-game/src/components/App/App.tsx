import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameSettings from '../GameSettings/GameSettings';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import useDifficultyState from '../../hooks/useDifficultyState';
import './App.scss';
import { PropertySignature } from 'typescript';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useDifficultyState(0);

  const handleDifficultyChange = (n: number) => {
    setDifficulty(n);
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route exact path="/play" render={(props: any) => <Board difficulty={difficulty} />} />
        <Route
          exact
          path="/settings"
          render={(props: any) => <GameSettings handleChange={(n) => handleDifficultyChange(n)} />}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
