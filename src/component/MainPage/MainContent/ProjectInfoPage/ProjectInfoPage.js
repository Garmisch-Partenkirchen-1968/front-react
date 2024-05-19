import React, {useState} from 'react';
import IssueBoardSummary from './IssueBoardSummary';
import './ProjectInfoPage.css';
import IssueBoard from "./IssueBoard/IssueBoard";

// 더미 데이터 생성
const ProjectData = {
    name: 'Project Alpha',
    description: 'This is a sample project description.',
    issues: [
        { id: 1, title: 'Issue 1', date: new Date('2024-05-01'), status: 'Open' },
        { id: 2, title: 'Issue 2', date: new Date('2024-05-02'), status: 'Closed' },
        { id: 3, title: 'Issue 3', date: new Date('2024-05-03'), status: 'Open' },
        { id: 4, title: 'Issue 4', date: new Date('2024-05-04'), status: 'Open' },
        { id: 5, title: 'Issue 5', date: new Date('2024-05-05'), status: 'Closed' },
    ],
};

const ProjectInfoPage = () => {
    const [showIssueBoard, setShowIssueBoard] = useState();
    const [issues, setIssues] = useState(ProjectData.issues)
    return (
        <div className="project-info-page">
            {!showIssueBoard ?
                <div>
                    <h1>{ProjectData.name}</h1>
                    <p>{ProjectData.description}</p>
                    <IssueBoardSummary
                        issues={ProjectData.issues}
                        maxIssuesToShow={3}
                        setShowIssueBoard={setShowIssueBoard}
                    />
                </div>
                :
                <IssueBoard
                    issues={issues}
                    setIssues={setIssues}
                />
            }
        </div>
    );
};

export default ProjectInfoPage;
