import React, { createContext, useState } from 'react';

interface LangContextInterface {
  lang: string;
  changeLang: (arg0: string) => void;
}

export const LanguageContext = createContext<LangContextInterface | null>(null);

export const LanguageProvider = (props: any) => {
  const [lang, setLang] = useState('en');

  const changeLang = (lang: string) => {
    setLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
