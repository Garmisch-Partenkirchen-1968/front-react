import React from 'react';
import './IssueBoardSummary.css';
import '../IssueBoard/IssueBoard.css';
import IssueItem from "../IssueBoard/IssueItem";

const IssueBoardSummary = ({ issues, maxIssuesToShow, handleViewMore, handleNewIssue }) => {

    issues = [
        { id: 1, title: 'Issue 111', description: 'Description 1', reporter: 'Alice', reportedDate: new Date('2024-05-01'), fixer: 'Bob', assignee: 'Charlie', priority: 'HIGH', status: 'NEW' },
    ];

    return (
        <div className="issue-board-summary">
            <div className="view-more-container">
                <button className="view-more-button" onClick={handleViewMore}>View More</button>
                <button className="new-issue-button" onClick={handleNewIssue}>New Issue</button>
            </div>
            {issues.slice(0, maxIssuesToShow).map((issue) => (
                <IssueItem key={issue.id} issue={issue}/>
            ))}
        </div>
    );
};

export default IssueBoardSummary;
