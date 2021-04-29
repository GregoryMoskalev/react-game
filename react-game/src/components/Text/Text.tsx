import React, {useContext} from "react";
import languages from "../../languages/languages";
import {LanguageContext} from "../../contexts/LanguageContext";

const Text: React.FC<any> = ({id}) => {
  const langContext = useContext(LanguageContext);
  return <>{languages[langContext!.lang][id]}</>;
};

export default React.memo(Text);
