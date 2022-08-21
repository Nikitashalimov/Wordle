import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from './routes/GamePage/GamePage';
import StartPage from './routes/StartPage/StartPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="https://github.com/Nikitashalimov/Wordle/" exact
          element={<StartPage />}
        />
        <Route path="https://github.com/Nikitashalimov/Wordle/game"
          element={<GamePage />}
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;