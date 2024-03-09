import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css';
import RouteLayout from './components/RouteLayout/RouteLayout';
import Home from './components/Home/Home';
import ErrorLayout from './components/ErrorLayout/ErrorLayout';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  let router=createBrowserRouter([
    {
      path:'',
      element:<RouteLayout />,
      errorElement:<ErrorLayout />,
      children:[
        {
          path:'',
          element:<Home />
        },
        {
          path:'signup',
          element:<SignUp />
        },
        {
          path:'signin',
          element:<SignIn />
        },
        {
          path:'user-profile',
          element:<UserProfile />
        }
      ]
    }
  ])
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
