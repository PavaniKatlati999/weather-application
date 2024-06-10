import React from "react";

const Header = ({ setShowModal }) => (
  <div className="header">
    <h1 className="header-title">Weather Tracker</h1>
    <div className="controls">
      <button onClick={() => setShowModal(true)} className="add-city-button">
        Add City
      </button>
    </div>
  </div>
);

export default Header;
