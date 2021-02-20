import React from 'react';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Board />
      <Footer />
    </div>
  );
};

export default App;
