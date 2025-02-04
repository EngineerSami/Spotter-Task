import React from "react";
import { Menu, Briefcase, Compass, Plane, Hotel, Home, Sun, Grid, UserCircle } from "lucide-react";
import "../styles/navbar.css";

function NavBar() {
  return (
    <div className="navbar">
      <div className="menu-icon">
        <Menu size={24} />
      </div>
      <div className="google-logo">Google</div>
      <div className="nav-links">
        <a href="#"><Briefcase size={20} /> Travel</a>
        <a href="#"><Compass size={20} /> Explore</a>
        <a href="#" className="active"><Plane size={20} /> Flights</a>
        <a href="#"><Hotel size={20} /> Hotels</a>
        <a href="#"><Home size={20} /> Holiday rentals</a>
      </div>
      <div style={{display:"flex" , marginRight:"20px"}}>
      <div className="sun-icon">
        <Sun size={24} />
      </div>
      <div className="apps-icon">
        <Grid size={24} />
      </div>
      <div className="user-icon">
        <UserCircle size={24} />
      </div>
      </div>
      
    </div>
  );
}

export default NavBar;
