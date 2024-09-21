import React, { useState } from 'react';
import { FaBicycle, FaFileContract, FaBars } from 'react-icons/fa';
import './Sidebar.css'; // Не забудь добавить CSS для стилей
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
        <Link to="/"><li>
            <FaBicycle />
            {isOpen && <span>Bicycles</span>}
          </li></Link>
          <Link to="/RentalContracts"><li>
            <FaFileContract />
            {isOpen && <span>Rental Contracts</span>}
          </li></Link>
          <li>
            <a href='/'>sdfgbdsfg</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;