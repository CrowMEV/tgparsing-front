import { store } from './../store/index';
import { logout } from '../store/user-slice/apiActions';

export const logoutChannel = new BroadcastChannel('logout');

export const logoutAllTabs = () => {
  logoutChannel.onmessage = () => {
    store.dispatch(logout());
    logoutChannel.close();
  };
};
