// import logo from './logo.svg';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import { Depositstepfirst } from "./Pages/Depositstepfirst";
import { Dashboard } from "./Pages/Dashboard";
import { Homepage } from "./Pages/Homepage";
import { Governace } from "./Pages/Governace";
import Economy from "./Pages/Economy";
import { Activities } from "./Pages/Activities";
import UserPrivateRoutes from "./PrivateRoutes/userRoutes";
import { AdminDashboard } from "./Pages/Admin/AdminDashboard";
import { AdminLeaderboard } from "./Pages/Admin/AdminLeaderboard";
import { Adminuserlist } from "./Pages/Admin/Adminuserlist";
import { AdminVerifyOtp } from "./Pages/Admin/AdminVerifyOtp";
import { Adminearnpoint } from "./Pages/Admin/Adminearnpoint";
import { AdminGenealogy } from "./Pages/Admin/AdminGenealogy";
import { AdminLogin } from "./Pages/Admin/Adminlogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/deposit-step-1"
            element={
              <UserPrivateRoutes>
                <Depositstepfirst />
              </UserPrivateRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <UserPrivateRoutes>
                <Dashboard />
              </UserPrivateRoutes>
            }
          />
          <Route
            path="/activities"
            element={
              <UserPrivateRoutes>
                <Activities />
              </UserPrivateRoutes>
            }
          />

          {/* front pages */}
          <Route path="/home" element={<Homepage />} />
          <Route path="/governance" element={<Governace />} />
          <Route path="/economy" element={<Economy />} />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-otp" element={<AdminVerifyOtp />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-leaderboard" element={<AdminLeaderboard />} />
          <Route path="/admin-userlist" element={<Adminuserlist />} />
          <Route path="/admin-earnpoint" element={<Adminearnpoint />} />
          <Route path="/admin-genealogy" element={<AdminGenealogy />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
