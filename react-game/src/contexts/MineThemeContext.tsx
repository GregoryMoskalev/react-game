import React, { createContext, useState } from 'react';
import useStateAndLS from '../hooks/useStateAndLS';

interface MineThemeContextInterface {
  mine: string;
  changeMineTheme: () => void;
}

export const MineThemeContext = createContext<MineThemeContextInterface>({
  mine: 'bug',
  changeMineTheme: () => null,
});

export const MineProvider = (props: any) => {
  const [mine, setMine] = useStateAndLS('bug', 'bugsweeper-mineTheme');

  const changeMineTheme = () => {
    setMine(mine === 'virus' ? 'bug' : 'virus');
  };

  return (
    <MineThemeContext.Provider value={{ mine, changeMineTheme }}>
      {props.children}
    </MineThemeContext.Provider>
  );
};
