import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton";
import { Link, Outlet } from "react-router-dom";
import Candidate from "../Candidate";
import { useEffect, useState } from "react";
import axios from "axios";
import NewsPage from "../News";

export default function Root() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <h1>UCSG</h1>
          {isAuthenticated && (
            <>
              <img src={user.picture} alt={user.name} className="avatar" />
              <p>{user.email}</p>
              <Link to="/vote">
                <button>Votar</button>
              </Link>
              <Link to="/news">
                <button>Noticias</button>
              </Link>
              <LogoutButton />
            </>
          )}
        </div>
        <div id="main">
          <Outlet />
        </div>
      </div>
    </>
  );
}
