import AppPage from './pages/AppPage'
import UsersListPage, { loadUserList } from './pages/UsersListPage'
import { RouteObject, useRoutes } from "react-router-dom";
import App, { loadCurrentUser } from './App'
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage, { loadAdminsList } from './pages/AdminsListPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute ';

const routes: RouteObject[] = [
  {
    element: <App />,
    path: "/",
    //loader: loadCurrentUser,
    children: [
      {
        path: "/",
        element: <AppPage />,
      },
      {
        path: "users",
        element: <ProtectedRoute to='/login-user'><UsersListPage /></ProtectedRoute>,
        loader: loadUserList
       },
       {
        path: "admins",
        element: <ProtectedRoute to='/login'><AdminsListPage /></ProtectedRoute>,
        loader: loadAdminsList
       },
       {
        path:"*",
        element: <NotFoundPage />
       }
    ]
  }
];

export {routes}
export default function Router() {
  return useRoutes(routes);
}