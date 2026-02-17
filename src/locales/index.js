import { az } from './az';
import { en } from './en';
import { ru } from './ru';

export const translations = {
  az,
  en,
  ru,
};

export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return value || key;
};
