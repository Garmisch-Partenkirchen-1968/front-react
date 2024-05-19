import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IssueBoardSummary from './IssueBoardSummary';
import './ProjectInfoPage.css';

const ProjectInfoPage = ({ProjectData}) => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/project/${projectId}/issueboard`);
    };

    return (
        <div className="project-info-page">
            <h1>{ProjectData.name}</h1>
            <h2>{projectId}</h2>
            <p>{ProjectData.description}</p>
            <IssueBoardSummary
                issues={ProjectData.issues}
                maxIssuesToShow={3}
                handleViewMore={handleViewMore}
            />
        </div>
    );
};

export default ProjectInfoPage;
