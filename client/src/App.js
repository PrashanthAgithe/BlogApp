import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading/Loading';
import RouteLayout from './components/RouteLayout/RouteLayout';
import Home from './components/Home/Home';
import ErrorLayout from './components/ErrorLayout/ErrorLayout';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import UserProfile from './components/UserProfile/UserProfile';
import AuthorsProfile from './components/AuthorsProfile/AuthorsProfile';
const Articles=lazy(()=>import('./components/Articles/Articles'))
const AddArticle=lazy(()=>import('./components/AddArticle/AddArticle'))
const ArticlebyId=lazy(()=>import('./components/ArticlebyId/ArticlebyId'))
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
              element:<Suspense fallback={<Loading />}><Articles /></Suspense>
            },
            {
              path:'article/:articleId',
              element:<Suspense fallback={<Loading />}><ArticlebyId /></Suspense>
            }
          ]
        },
        {
          path:'author-profile',
          element:<AuthorsProfile />,
          children:[
            {
              path:'articles',
              element:<Suspense fallback={<Loading />}><Articles /></Suspense>
            },
            {
              path:'new-article',
              element:<Suspense fallback={<Loading />}><AddArticle /></Suspense>
            },
            {
              path:'article/:articleId',
              element:<Suspense fallback={<Loading />}><ArticlebyId /></Suspense>
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
