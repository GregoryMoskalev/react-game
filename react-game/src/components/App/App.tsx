import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameSettings from '../GameSettings/GameSettings';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import './App.scss';
import SoundEffects from "../SoundEffects";

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Board} />
        <Route exact path="/settings" component={GameSettings} />
      </Switch>
      <Footer />
      <SoundEffects />
    </div>
  );
};

export default App;
