import { HashRouter, Route, Routes } from "react-router-dom";
import GamePage from './routes/GamePage/GamePage';
import StartPage from './routes/StartPage/StartPage';

import './App.css';

function App() {
  return (
    <HashRouter basename = "/">

      <Routes>
        <Route path="/" exact element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>

    </HashRouter>

  );
}

export default App;