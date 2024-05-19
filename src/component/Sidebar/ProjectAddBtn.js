import React from 'react';
import './ProjectAddBtn.css';

function ProjectAddBtn({ isActive, onNavigate }) {
    const handleClick = () => {
        onNavigate();
    };

    return (
        <button onClick={handleClick} className={`project-add-btn ${isActive ? "active" : ""}`}>
            + Add Project
        </button>
    );
}

export default ProjectAddBtn;
