import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css';
import RouteLayout from './components/RouteLayout/RouteLayout';
import Home from './components/Home/Home';
import ErrorLayout from './components/ErrorLayout/ErrorLayout';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import UserProfile from './components/UserProfile/UserProfile';
import AuthorsProfile from './components/AuthorsProfile/AuthorsProfile';
import AddArticle from './components/AddArticle/AddArticle';
import Articles from './components/Articles/Articles';
import ArticlebyId from './components/ArticlebyId/ArticlebyId';

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
          element:<UserProfile />,
          children:[
            {
              path:'',
              element:<Articles />
            },
            {
              path:'article/:articleId',
              element:<ArticlebyId />
            }
          ]
        },
        {
          path:'author-profile',
          element:<AuthorsProfile />,
          children:[
            {
              path:'new-article',
              element:<AddArticle />
            },
            {
              path:'articles',
              element:<Articles />
            },
            {
              path:'article/:articleId',
              element:<ArticlebyId />
            }
          ]
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
