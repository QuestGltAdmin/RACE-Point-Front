// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./Pages/Landing";
import { Depositstepfirst } from "./Pages/Depositstepfirst";
import { Dashboard } from "./Pages/Dashboard";
import { Leaderboard } from "./Pages/Leaderboard";
import { Homepage } from "./Pages/Homepage";
import { Governace } from "./Pages/Governace";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/deposit-step-1" element={<Depositstepfirst />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* front pages */}
          <Route path="/home" element={<Homepage />} />
          <Route path="/governance" element={<Governace />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;