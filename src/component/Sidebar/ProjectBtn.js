import React from 'react';
import './ProjectBtn.css';

function ProjectBtn({ title, isActive, onNavigate }) {
    return (
        <button
            onClick={onNavigate}
            className={`menu-button ${isActive ? "active" : ""}`}
        >
            <i className="fa-solid fa-file-lines"></i>
            {title}
        </button>
    );
}

export default ProjectBtn;
