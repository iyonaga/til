import React from 'react';
import './App.css';

import Map from '../containers/Map';
import Weather from '../containers/Weather';

export type AppProps = {
    isLoading: boolean;
}

const App: React.FC<AppProps> = ({isLoading}: AppProps) => {
  return (
    <div className="app">
      {isLoading && <div className="loading" />}
      <header className="header">
        <h1>Weather Map</h1>
        <small>(This sample application = React + redux-observable + TypeScript)</small>
      </header>
      <main className="main">
        <Map />
        <Weather />
      </main>
    </div>
  );
}

export default App;
