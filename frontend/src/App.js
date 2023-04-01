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

import NotFound from './pages/NotFound';



function App() {
  return (
    // Handling of routes in Frontend
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

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
      </Route>

      {/* Admin Page 
      NOTE: Mobile View and Desktop View */}
      <Route element={<AdminLayout />}>
        <Route path='/dashboard' element={<Dashboard/>} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
