import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton";
import { Link, Outlet } from "react-router-dom";
import { BiNews } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";

export default function Root() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <h1>UCSG</h1>
          {isAuthenticated && (
            <>
              <img src={user.picture} alt={user.name} className="avatar" />
              <p>{user.email}</p>
              <h2>Facultad de Ingeniería</h2>
              <Link to="/vote">
                <button>
                  <AiFillCheckCircle /> Votar
                </button>
              </Link>
              <Link to="/news">
                <button>
                  <BiNews /> Noticias
                </button>
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
