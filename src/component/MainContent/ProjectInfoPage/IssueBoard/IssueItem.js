import React from 'react';
import './IssueItem.css';
import { useNavigate, useParams } from 'react-router-dom';

const IssueItem = ({ issue }) => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const descriptionComment = (issue.comments || []).find(comment => comment.isDescription);
    const description = descriptionComment ? descriptionComment.content : 'No description provided.';

    return (
        <div className="issue-item" onClick={() => navigate(`/project/${projectId}/issue/${issue.id}`)}>
            <div className="issue-header">
                <h3>{issue.title}</h3>
                <span className={`status ${issue.status.toLowerCase()}`}>{issue.status}</span>
            </div>
            <p className="description">{description}</p>
            <div className="issue-meta">
                <span>Reporter: {issue.reporter ? issue.reporter.username : 'No Reporter'}</span>
                <span>Reported Date: {issue.reportedDate ? new Date(issue.reportedDate).toLocaleDateString() : 'No Reported Date'}</span>
                <span>Fixer: {issue.fixer ? issue.fixer.username : 'No Fixer'}</span>
                <span>Assignees: {issue.assignee ? issue.assignee.username : 'No Assignee'}</span>
                <span className={`priority ${issue.priority.toLowerCase()}`}>Priority: {issue.priority}</span>
            </div>
        </div>
    );
};

export default IssueItem;
