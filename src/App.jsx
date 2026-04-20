import React from 'react';
import { AppProvider } from './context/AppContext.jsx';
import AppRouter from './router/AppRouter.jsx';

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
