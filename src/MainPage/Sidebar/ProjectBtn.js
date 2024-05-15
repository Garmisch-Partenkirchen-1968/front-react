import React from 'react';
import './ProjectBtn.css';

function ProjectBtn({ title, projectId, setProjectId, isActive}) {

    const handleClick = () => {
        setProjectId(projectId);
    };

    return (
        <button
            onClick={handleClick}
            className={`menu-button ${isActive ? "active" : ""}`}
        >
            { title }
        </button>
    );
}

export default ProjectBtn;
