import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './MainContent.css';
import ProjectInfoPage from "./ProjectInfoPage/ProjectInfoPage";

function MainContent({ isOpen, userInfo }) {
    const [searchParams] = useSearchParams();
    const contentType = searchParams.get('contentType');
    const projectId = searchParams.get('project');

    return (
        <div className={`container ${isOpen ? "open" : "closed"}`}>
            {contentType === "project" && projectId && <ProjectInfoPage projectId={projectId} />}
            {contentType === "newProject" && <div>Create a new project here.</div>}
            {contentType === "main" && <div>Welcome to the main content area!</div>}
        </div>
    );
}

export default MainContent;
