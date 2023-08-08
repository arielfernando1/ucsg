import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root.jsx";
import LoginButton from "./LoginButton";
import ErrorPage from "./error-page";
import Details from "./Details";
import Results from "./Results";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/main",
        element: <h1>Main</h1>,
      },
    ],
  },
  {
    path: "/details/:id",
    element: <Details />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/results",
    element: <Results />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{isAuthenticated ? <RouterProvider router={router} /> : <Home />}</>;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8j2dum5fg6qf3dqg.us.auth0.com"
      clientId="HlDVsonwX0jO9tmCY783IbKRR5ITEHdX"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
