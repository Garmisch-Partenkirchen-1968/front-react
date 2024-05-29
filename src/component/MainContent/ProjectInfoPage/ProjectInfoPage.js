// ProjectInfoPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IssueBoardSummary from './ProjectComponent/IssueBoardSummary';
import ProjectProgress from './ProjectComponent/ProjectProgress';
import './ProjectInfoPage.css';
import axios from "axios";

const initProjectData = {
    name: 'Dummy Project',
    description: 'This is a sample project description.',
    startDate: new Date('2024-05-01'),
};

const initIssueData = [
    { id: 1, title: 'Issue 1', description: 'Description 1', reporter: 'Alice', reportedDate: new Date('2024-05-01'), fixer: 'Bob', assignee: 'Charlie', priority: 'HIGH', status: 'NEW' },
    { id: 2, title: 'Issue 2', description: 'Description 2', reporter: 'Dave', reportedDate: new Date('2024-05-02'), fixer: 'Eve', assignee: 'Frank', priority: 'MEDIUM', status: 'CLOSED' },
    { id: 3, title: 'Issue 3', description: 'Description 3', reporter: 'Grace', reportedDate: new Date('2024-05-03'), fixer: 'Heidi', assignee: 'Ivan', priority: 'LOW', status: 'FIXED' },
    { id: 4, title: 'Issue 4', description: 'Description 4', reporter: 'Jack', reportedDate: new Date('2024-05-04'), fixer: 'Kathy', assignee: 'Leo', priority: 'CRITICAL', status: 'RESOLVED' },
    { id: 5, title: 'Issue 5', description: 'Description 5', reporter: 'Mallory', reportedDate: new Date('2024-05-05'), fixer: 'Niaj', assignee: 'Oscar', priority: 'HIGH', status: 'ASSIGNED' },
    { id: 6, title: 'Issue 6', description: 'Description 6', reporter: 'Pat', reportedDate: new Date('2024-05-06'), fixer: 'Quinn', assignee: 'Riley', priority: 'LOW', status: 'OPEN' },
    { id: 7, title: 'Issue 7', description: 'Description 7', reporter: 'Sam', reportedDate: new Date('2024-05-07'), fixer: 'Trudy', assignee: 'Uma', priority: 'CRITICAL', status: 'NEW' },
    { id: 8, title: 'Issue 8', description: 'Description 8', reporter: 'Victor', reportedDate: new Date('2024-05-08'), fixer: 'Wendy', assignee: 'Xander', priority: 'MEDIUM', status: 'ASSIGNED' },
    { id: 9, title: 'Issue 9', description: 'Description 9', reporter: 'Yara', reportedDate: new Date('2024-05-09'), fixer: 'Zane', assignee: 'Alice', priority: 'LOW', status: 'FIXED' },
    { id: 10, title: 'Issue 10', description: 'Description 10', reporter: 'Bob', reportedDate: new Date('2024-05-10'), fixer: 'Charlie', assignee: 'Dave', priority: 'HIGH', status: 'CLOSED' },
];

const ProjectInfoPage = ({ userInfo }) => {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(initProjectData);
    const [issueData, setIssueData] = useState(initIssueData);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssueData = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}/issues`, {
                params: {
                    username: userInfo.username,
                    password: userInfo.password,
                }
            }).then((response) => {
                setIssueData(response.data);
            }).catch((error) => {
                console.error('Failed to fetch current project:', error);
            });
        };

        const fetchProjectData = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
                params: {
                    username: userInfo.username,
                    password: userInfo.password,
                }
            }).then((response) => {
                if (typeof response.data === 'string' && /<[^>]*>/.test(response.data)) {
                    console.error('Received HTML instead of JSON');
                } else if (response.data && typeof response.data === 'object') {
                    setProjectData(response.data);
                } else {
                    console.error('Expected a JSON object but received something else');
                }
            }).catch((error) => {
                console.error('Failed to fetch current project:', error);
            });
        };

        fetchProjectData();
        fetchIssueData();
    }, [userInfo, projectId]);

    const handleViewMore = () => {
        navigate(`/project/${projectId}/issueboard`);
    };

    const handleSettings = () => {
        navigate(`/project/${projectId}/settings`);
    };

    return (
        <div className="project-info-page">
            <div className="project-header">
                <h1>{projectData.name}</h1>
                <p>{projectData.description}</p>
            </div>
            <button className="settings-button" onClick={handleSettings}>Project Settings</button>
            <ProjectProgress
                projectData={projectData}
                issueData={issueData} />
            <IssueBoardSummary
                userInfo={userInfo}
                issues={issueData}
                maxIssuesToShow={3}
                handleViewMore={handleViewMore}
            />
        </div>
    );
};

export default ProjectInfoPage;
