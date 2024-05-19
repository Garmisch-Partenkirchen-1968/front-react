import React from 'react';
import './IssueItem.css';

const IssueItem = ({ issue }) => {
    return (
        <div className="issue-item">
            <div className="issue-header">
                <h3>{issue.title}</h3>
                <span className={`status ${issue.status.toLowerCase()}`}>{issue.status}</span>
            </div>
            <p className="description">{issue.description}</p>
            <div className="issue-meta">
                <span>Reporter: {issue.reporter}</span>
                <span>Reported Date: {issue.reportedDate instanceof Date ? issue.reportedDate.toLocaleDateString() : 'N/A'}</span>
                <span>Fixer: {issue.fixer}</span>
                <span>Assignee: {issue.assignee}</span>
                <span className={`priority ${issue.priority.toLowerCase()}`}>Priority: {issue.priority}</span>
            </div>
        </div>
    );
};

export default IssueItem;
