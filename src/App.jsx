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
import { AdminUpdateMulti } from "./Pages/Admin/AdminUpdateMulti";
import ScrollToTop from "./Components/ScrollToTop";
import { DirectWithdraw } from "./Pages/DirectWithdraw";
import { AdminContractList } from "./Pages/Admin/AdminContractList";
import { AdminAddUsers } from "./Pages/Admin/AdminAddUsers";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <ScrollToTop>
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
            <Route
              path="/direct-withdraw"
              element={
                <UserPrivateRoutes>
                  <DirectWithdraw />
                </UserPrivateRoutes>
              }
            />

            {/* front pages */}
            <Route path="/home" element={<Homepage />} />
            <Route path="/governance" element={<Governace />} />
            <Route path="/economy" element={<Economy />} />

            <Route path="/main-login" element={<AdminLogin />} />
            <Route path="/main-otp" element={<AdminVerifyOtp />} />
            <Route path="/main-dashboard" element={<AdminDashboard />} />
            <Route path="/main-leaderboard" element={<AdminLeaderboard />} />
            <Route path="/main-userlist" element={<Adminuserlist />} />
            <Route path="/main-earnpoint" element={<Adminearnpoint />} />
            <Route path="/main-genealogy" element={<AdminGenealogy />} />
            <Route path="/main-update-multi" element={<AdminUpdateMulti />} />
            <Route path="/main-token-list" element={<AdminContractList />} />
            <Route path="/main-add-user" element={<AdminAddUsers />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
