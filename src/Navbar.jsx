import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SegmentPopup from './SegmentPopup';

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <a href="/">
              <FontAwesomeIcon icon={faChevronLeft} style={{color: "#ffffff"}} size='2xs'/>
            </a>
          </div>
          <div className="nav-option">
            <a href="/menu">View audience</a>
          </div>
        </div>
      </nav>
      <div className="save-button-container">
        <button className="save-button" onClick={togglePopup}>Save segment</button>
      </div>
      {isPopupOpen && <SegmentPopup onClose={togglePopup} />}
    </>
  );
};

export default Navbar;