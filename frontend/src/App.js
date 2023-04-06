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
import History from './pages/client/History';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin'

import NotFound from './pages/NotFound';
import AdminLeaderboard from './pages/admin/AdminLeaderboard';
import PointsRewards from './pages/admin/PointsRewards';
import SupportUs from './pages/client/SupportUs';



function App() {
  return (
    // Handling of routes in Frontend
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/admin-login' element={<AdminLogin />} />

      {/* User Page
      NOTE: Mobile View only for Users */}
      <Route element={<UserLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/reward-category' element={<RewardCategory />} />
        <Route path='/rewards' element={<Rewards />} />
        <Route path='/leaderboards' element={<Leaderboards />} />
        <Route path='/history' element={<History />} />
        <Route path='/support-us' element={<SupportUs />} />
      </Route>

      {/* Admin Page 
      NOTE: Mobile View and Desktop View */}
      <Route element={<AdminLayout />}>
        <Route path='/admin/dashboard' element={<Dashboard/>} />
        <Route path='/admin/leaderboard' element={<AdminLeaderboard />} />
        <Route path='/admin/give-points-rewards' element={<PointsRewards />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
