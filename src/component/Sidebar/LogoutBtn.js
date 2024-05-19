import React from 'react';
import "./LogoutBtn.css";

function LogoutBtn() {

    const handleClick = () => {
    };

    return (
        <button
            onClick={handleClick}
            className="logout-button"
        >
            {"Logout"}
        </button>
    );
}

export default LogoutBtn;
