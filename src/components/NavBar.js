import React, {useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const NavBar = (props) => {

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user-name');
    props.showAlert("Logged out successfully!", "success");
    navigate("/login");
  }

  let location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
      <i className="fa-solid fa-note-sticky fa-xl mx-2" style={{"color": "#198754"}}></i>
        <Link className="navbar-brand" to="/">CloudNotes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
            </li>
          </ul>
          {/* Login, log out, Sign Up and My account buttons logic */}
            {localStorage.getItem('token')?<><Link className='mx-3' role='button' to='/myaccount'><i style={{ "color": "#198754" }} className="fa-solid fa-user fa-xl"></i></Link>
            <Link className='btn btn-success mx-3' role='button' to='/login' onClick={handleLogOut}>Log Out</Link></>
            :<><Link className='btn btn-success mx-3' role='button' to='/signup'>Sign Up</Link>
            <Link className='btn btn-success' role='button' to='/login'>Login</Link></>}
        </div>
      </div>
    </nav>
  )
}

export default NavBar;