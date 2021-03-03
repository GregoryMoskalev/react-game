import React, { createContext, useState } from 'react';
import useStateAndLS from '../hooks/useStateAndLS';

interface LangContextInterface {
  lang: string;
  changeLang: (arg0: string) => void;
}

export const LanguageContext = createContext<LangContextInterface | null>(null);

export const LanguageProvider = (props: any) => {
  const [lang, setLang] = useStateAndLS('en', 'bugsweeper-lang');

  const changeLang = (lang: string) => {
    setLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
