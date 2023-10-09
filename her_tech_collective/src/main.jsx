import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// Importing pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateProfilePage from './pages/CreateProfile';
import ProfilesPage from './pages/ProfilesPage';
import ProfilePage from './pages/ProfilePage';

//Importing components
import NavBar from './components/NavBar';


const router = createBrowserRouter([
  { path: "/", element: <NavBar />,
    children: [
      {path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/profiles/", element: <ProfilesPage /> },
      { path: "/account/:id/", element: <AccountPage />},
      { path: "/login/", element: <LoginPage />},
      { path: "/register/", element: <RegisterPage />},
      { path: "/profiles/create/", element: <CreateProfilePage />},
      { path: "/profiles/:id/", element: <ProfilePage />},
    ] 
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
