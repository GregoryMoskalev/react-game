import React from 'react';
import Footer from '../Footer/Footer';
import Game from '../Game/Game';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
      <Footer />
    </div>
  );
};

export default App;
