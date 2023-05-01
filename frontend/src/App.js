import { Route,Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

// User Pages
import About from './pages/client/About';
import Home from './pages/client/Home';
import Login from './pages/client/Login';
import Profile from './pages/client/Profile';
import Register from './pages/client/Register';
import RewardCategory from './pages/client/RewardCategory';
import Rewards from './pages/client/Rewards';
import Leaderboards from './pages/client/Leaderboards';
import EarnRewards from './pages/client/EarnRewards';
import PointsRewards from './pages/admin/PointsRewards';
import SupportUs from './pages/client/SupportUs';
import EarnPoints from './pages/client/EarnPoints';
import Verify from './pages/client/Verify';
import ForgotPassword from './pages/client/ForgotPassword';
import PasswordVerify from './pages/client/PasswordVerify';
import ChangePassword from './pages/client/ChangePassword';
import Learn from './pages/client/Learn'

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin'

import NotFound from './pages/NotFound';
import AdminLeaderboard from './pages/admin/AdminLeaderboard';
import Messages from './pages/admin/Messages';
import CollectionRecords from './pages/admin/CollectionRecords';
import Accounts from './pages/admin/Accounts';
import UserProfile from './pages/admin/UserProfile';
import AdminRegister from './pages/admin/AdminRegister';
import GenerateReports from './pages/admin/GenerateReports';

import { useState } from 'react'; 

function App() {

  // Will be used in Admin page for giving rewards or points
  const [currentPage,setCurrentPage] = useState('Give Points');

  return (
    // Handling of routes in Frontend
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/verify/:id' element={<Verify />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/password-verify/:id' element={<PasswordVerify />} />
      <Route path='/change-password/:id' element={<ChangePassword />} />

      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='/admin-register' element={<AdminRegister />} />

      {/* User Page
      NOTE: Mobile View only for Users */}
      <Route element={<UserLayout/>}>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/reward-category' element={<RewardCategory />} />
        {/* <Route path='/rewards' element={<Rewards />} /> */}
        <Route path='/leaderboards' element={<Leaderboards />} />
        <Route path='/earn-rewards' element={<EarnRewards />} />
        <Route path='/support-us' element={<SupportUs />} />
        <Route path='/earn-points' element={<EarnPoints />} />
        <Route path='/learn/:id' element={<Learn />} />
      </Route>

      {/* Admin Page 
      NOTE: Mobile View and Desktop View */}
      <Route element={<AdminLayout />}>
        <Route path='/admin/dashboard' element={<Dashboard/>} />
        <Route path='/admin/leaderboard' element={<AdminLeaderboard />} />
        <Route path='/admin/give-points-rewards' element={<PointsRewards currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
        <Route path='/admin/messages' element={<Messages />} />
        <Route path='/admin/collection-records' element={<CollectionRecords />} />
        <Route path='/admin/accounts' element={<Accounts />} />
        <Route path='/admin/userprofile/:id' element={<UserProfile />} />
        <Route path='/admin/reports' element={<GenerateReports />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
