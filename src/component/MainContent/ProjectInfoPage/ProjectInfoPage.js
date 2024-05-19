import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IssueBoardSummary from './ProjectComponent/IssueBoardSummary';
import ProjectProgress from './ProjectComponent/ProjectProgress';
import './ProjectInfoPage.css';

const ProjectInfoPage = ({ ProjectData }) => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/project/${projectId}/issueboard`);
    };

    const handleNewIssue = () => {
        // 새로운 이슈를 작성하는 로직을 여기에 추가합니다.
        console.log('New issue button clicked');
    };

    return (
        <div className="project-info-page">
            <div className="project-header">
                <h1>{ProjectData.name}</h1>
                <p>{ProjectData.description}</p>
            </div>
            <ProjectProgress projectData={ProjectData} />
            <IssueBoardSummary
                issues={ProjectData.issues}
                maxIssuesToShow={3}
                handleViewMore={handleViewMore}
                handleNewIssue={handleNewIssue}
            />
        </div>
    );
};

export default ProjectInfoPage;
