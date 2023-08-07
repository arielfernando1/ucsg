import React from "react";

const Sidebar = ({ user, onLogout }) => {
  return (
    <div className="sidebar">
      {/* <div className="user-profile">
        <img src={user.avatar} alt="User Avatar" />
        <h3>{user.name}</h3>
      </div>
      <button onClick={onLogout}>Logout</button> */}
    </div>
  );
};

export default Sidebar;
