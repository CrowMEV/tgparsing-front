import { Modes, Roles } from '../consts/consts';

export const setModeByRole = (role: string): Modes => {
  switch (role) {
    case Roles.Admin:
      return Modes.Admin;
    case Roles.User:
      return Modes.User;
    default:
      return Modes.User;
  }
};
