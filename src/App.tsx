import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home/Home";
import AuthStatus from "./components/shared/Auth/AuthStatus";
import ErrorPage from "./components/shared/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => (
  <AuthStatus>
    <RouterProvider router={router} />
  </AuthStatus>
);

export default App;
