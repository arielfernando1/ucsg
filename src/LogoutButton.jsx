import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <BiLogOut />
    </button>
  );
};

export default LogoutButton;
