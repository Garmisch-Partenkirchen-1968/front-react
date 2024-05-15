import React, {useState} from 'react';
import './MainContent.css';

function MainContent({isOpen, userInfo, projectId} ) {

    return (
        <div className={`container ${isOpen ? "open" : "closed"}`}>
            <h2> main content </h2>
            {projectId}
        </div>
);
}

export default MainContent;
