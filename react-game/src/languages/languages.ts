import en from './en';
import ru from './ru';

interface langInterface {
  [key: string]: {
    [key: string]: string;
  };
}
const lang: langInterface = { en, ru };

export default lang;
