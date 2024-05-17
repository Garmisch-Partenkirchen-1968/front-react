import React from 'react';
import './ProjectBtn.css';

function ProjectBtn({ title, projectId, setProjectId, setContentType, isActive}) {

    const handleClick = () => {
        setProjectId(projectId);
        setContentType("project");
    };

    return (
        <button
            onClick={handleClick}
            className={`menu-button ${isActive ? "active" : ""}`}
        >
            <i className="fa-solid fa-file-lines"></i>
            { title }
        </button>
    );
}

export default ProjectBtn;
