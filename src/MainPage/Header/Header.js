import React, {useEffect, useState} from 'react';
import './Header.css'; // Assuming you will create a separate CSS file for styles


function Header({isOpen}) {
    return (
        <div className={`header ${isOpen ? "open" : "closed"}`}>
            {!isOpen && (
                <div className="logo-band">
                    <h2>GARMISCH1968</h2>
                </div>
            )}
        </div>
    );
}

export default Header;
