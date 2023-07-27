import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { logoutAllTabs } from './services/logout-channel';

function App() {
  useEffect(() => {
    logoutAllTabs();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
