import { Modes } from '../consts/consts';

export const getModeFromLocalStorage = () => {
  return (localStorage.getItem('mode') as Modes) || null;
};

export const saveModeToLocalStorage = (mode: Modes) => {
  localStorage.setItem('mode', mode);
};
