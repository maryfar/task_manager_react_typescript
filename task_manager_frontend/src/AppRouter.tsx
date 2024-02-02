

import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import { SignUpForm } from './components/signup';
import { LoginForm } from './components/login';
import { Main } from './components/main';
import NotFound from './pages/notfound';




const AppRouter = () => {
  const router = createBrowserRouter([
    {
      
      children:[
        {
          path: '/', element:<LoginForm />
        },
        {
          path: 'signup', element:<SignUpForm />
        },
        {
          path: 'main', element:<Main />
        },
       
      ],
      errorElement: <NotFound/>,
      
    }
  ])
  return (


    <RouterProvider router={router} fallbackElement={<div>loading...</div>}/>
    
  );
};
export default AppRouter;