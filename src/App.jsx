// import logo from './logo.svg';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import { Depositstepfirst } from "./Pages/Depositstepfirst";
import { Dashboard } from "./Pages/Dashboard";
import { Leaderboard } from "./Pages/Leaderboard";
import { Homepage } from "./Pages/Homepage";
import { Governace } from "./Pages/Governace";
import Economy from "./Pages/Economy";
import { Activities } from "./Pages/Activities";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/deposit-step-1" element={<Depositstepfirst />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/activities" element={<Activities />} />

          {/* front pages */}
          <Route path="/home" element={<Homepage />} />
          <Route path="/governance" element={<Governace />} />
          <Route path="/economy" element={<Economy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
