// import logo from './logo.svg';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import { Depositstepfirst } from "./Pages/Depositstepfirst";
import { Dashboard } from "./Pages/Dashboard";
// import { Homepage } from "./Pages/Homepage";
// import { Governace } from "./Pages/Governace";
// import Economy from "./Pages/Economy";
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
import AdminPrivateRoute from "./PrivateRoutes/AdminPrivateRoute";
import { DepositNew } from "./Pages/DepositNew";
import { History } from "./Pages/History";
import UserDashboard from "./Pages/SuperUser/UserDashboard";
import UserLeaderboard from "./Pages/SuperUser/UserLeaderboard";
import UserList from "./Pages/SuperUser/UserList";
import UserGenealogy from "./Pages/SuperUser/UserGenealogy";
import UserEarnPoints from "./Pages/SuperUser/UserEarnPoints";
import SuperUserRoutes from "./PrivateRoutes/SuperUserRoutes";

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

            <Route
              path="/deposit-new"
              element={
                // <UserPrivateRoutes>
                <DepositNew />
                // </UserPrivateRoutes>
              }
            />

            <Route
              path="/history"
              element={
                // <UserPrivateRoutes>
                <History />
                // </UserPrivateRoutes>
              }
            />

            {/* front pages */}
            {/* <Route path="/home" element={<Homepage />} />
            <Route path="/governance" element={<Governace />} />
            <Route path="/economy" element={<Economy />} /> */}

            <Route path="/main-login" element={<AdminLogin />} />
            <Route path="/main-otp" element={<AdminVerifyOtp />} />
            <Route
              path="/main-dashboard"
              element={
                <AdminPrivateRoute>
                  <AdminDashboard />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/main-leaderboard"
              element={
                <AdminPrivateRoute>
                  <AdminLeaderboard />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/main-userlist"
              element={
                <AdminPrivateRoute>
                  <Adminuserlist />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/main-earnpoint"
              element={
                <AdminPrivateRoute>
                  <Adminearnpoint />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/main-genealogy"
              element={
                <AdminPrivateRoute>
                  <AdminGenealogy />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/main-update-multi"
              element={
                <AdminPrivateRoute>
                  <AdminUpdateMulti />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/main-token-list"
              element={
                // <AdminPrivateRoute>
                <AdminContractList />
                // </AdminPrivateRoute>
              }
            />
            <Route
              path="/main-add-user"
              element={
                <AdminPrivateRoute>
                  <AdminAddUsers />
                </AdminPrivateRoute>
              }
            />
            <Route path="/*" element={<Navigate to={"/"} />} />

            {/* superuser routes */}
            <Route
              path="/manager-dashboard"
              element={
                <SuperUserRoutes>
                  <UserDashboard />
                </SuperUserRoutes>
              }
            />
            <Route
              path="/manager-leaderboard"
              element={
                <SuperUserRoutes>
                  <UserLeaderboard />
                </SuperUserRoutes>
              }
            />
            <Route
              path="/manager-list"
              element={
                <SuperUserRoutes>
                  <UserList />
                </SuperUserRoutes>
              }
            />
            <Route
              path="/manager-genealogy"
              element={
                <SuperUserRoutes>
                  <UserGenealogy />
                </SuperUserRoutes>
              }
            />
            <Route
              path="/manager-earnpoints"
              element={
                <SuperUserRoutes>
                  <UserEarnPoints />
                </SuperUserRoutes>
              }
            />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
