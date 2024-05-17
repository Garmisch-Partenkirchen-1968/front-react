import React from 'react';
import './ProjectAddBtn.css';

function ProjectAddBtn({ setContentType, isActive}) {

    const handleClick = () => {
        setContentType("newProject");
    };

    return (
        <button
            onClick={handleClick}
            className={`project-add-button ${isActive ? "active" : ""}`}
        >
            <i className="fa fa-plus"></i>
            { "Add New Project" }
        </button>
    );
}

export default ProjectAddBtn;
