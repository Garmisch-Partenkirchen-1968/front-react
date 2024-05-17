import React from 'react';
import './MainContent.css';

function MainContent({isOpen, userInfo, projectId, setContentType} ) {

    return (
        <div className={`container ${isOpen ? "open" : "closed"}`}>
            <h2> main content </h2>
            {projectId}
        </div>
);
}

export default MainContent;
