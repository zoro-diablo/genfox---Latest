import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Avatar from './pages/Avatar';
import DashboardLayout from './layout/DashboardLayout';
import Lobby from './pages/dashboard/Lobby';
import NetWorth from './pages/dashboard/NetWorth';
import Overviews from './pages/dashboard/Overviews';
import Addbudget from './pages/dashboard/Addbudget';
import Transaction from './pages/dashboard/Transaction';
import Goals from './pages/dashboard/Goals';
import Investment from './pages/dashboard/Investment';
import Recurring from './pages/dashboard/Recurring';
import Settings from './pages/dashboard/Settings';
import Firecalculator from './pages/dashboard/Firecalculator';
import ProtectedRoute from './context/ProtectedRoute';
import { ThemeProvider } from './theme/theme-provider';
import Details from './pages/Details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='form' element={<Details />} />
      <Route path='signin' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='avatar' element={<Avatar />} />
      <Route path='dashboard' element={<DashboardLayout />}>
        <Route path='lobby' element={<Lobby />} />
        <Route path='networth' element={<NetWorth />} />
        <Route path='budget/overview' element={<Overviews />} />
        <Route path='budget/addbudget' element={<Addbudget />} />
        <Route path='transactions' element={<Transaction />} />
        <Route path='goal' element={<Goals />} />
        <Route path='investments' element={<Investment />} />
        <Route path='recurring' element={<Recurring />} />
        <Route path='settings' element={<Settings />} />
        <Route path='retirement' element={<Firecalculator />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
