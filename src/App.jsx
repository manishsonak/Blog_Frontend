// App.jsx
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';
import About from './Pages/About';
import Contact from './Pages/Contact';
import TechBlog from './Pages/TechBlog';
import CategoryLayout from './Pages/CategoryLayout';
import PrivateRoute from './ProtectComponent/PrivateRoute';
import AdminProtactor from './ProtectComponent/AdminProtactor';
import Dashboard from './AdminPages/Dashboard';
import PostDetails from './Pages/PostDetails';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },{
          path: 'about',
          element: <About/>
        },{
            path:'article/:slug',
            element: <PostDetails/>
        },
        {
          path:'contact',
          element: <Contact/>
        },{
          path: '/dashboard',
          element: <AdminProtactor>
            <Dashboard/>
          </AdminProtactor>,
        }
        
      ]
    },
    {
      path: '/login',
      element: <LoginPage/>

    },
    {
      path: '/register',
      element: <RegisterPage/>
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword/>
    },{
      path: '/category',
      element:<CategoryLayout/>,
      children:[
        {
          path:'tech',
          element:
          <PrivateRoute>
            <TechBlog/>
          </PrivateRoute>
        }
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true
    }
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
