import React from 'react';
import './IssueBoardSummary.css';
import '../IssueBoard/IssueBoard.css';
import IssueItem from "../IssueBoard/IssueItem";

const IssueBoardSummary = ({ issues, maxIssuesToShow, handleViewMore, handleNewIssue }) => {

    issues = [
        { id: 1, title: 'Issue 111', description: 'Description 1', reporter: 'Alice', reportedDate: new Date('2024-05-01'), fixer: 'Bob', assignee: 'Charlie', priority: 'HIGH', status: 'NEW' },
        { id: 2, title: 'Issue 222', description: 'Description 2', reporter: 'Dave', reportedDate: new Date('2024-05-02'), fixer: 'Eve', assignee: 'Frank', priority: 'MEDIUM', status: 'CLOSED' },
        { id: 3, title: 'Issue 3', description: 'Description 3', reporter: 'Grace', reportedDate: new Date('2024-05-03'), fixer: 'Heidi', assignee: 'Ivan', priority: 'LOW', status: 'FIXED' },
        { id: 4, title: 'Issue 4', description: 'Description 4', reporter: 'Jack', reportedDate: new Date('2024-05-04'), fixer: 'Kathy', assignee: 'Leo', priority: 'CRITICAL', status: 'RESOLVED' },
        { id: 5, title: 'Issue 555', description: 'Description 5', reporter: 'Mallory', reportedDate: new Date('2024-05-05'), fixer: 'Niaj', assignee: 'Oscar', priority: 'HIGH', status: 'ASSIGNED' },
        { id: 6, title: 'Issue 6', description: 'Description 6', reporter: 'Pat', reportedDate: new Date('2024-05-06'), fixer: 'Quinn', assignee: 'Riley', priority: 'LOW', status: 'OPEN' },
        { id: 7, title: 'Issue 7', description: 'Description 7', reporter: 'Sam', reportedDate: new Date('2024-05-07'), fixer: 'Trudy', assignee: 'Uma', priority: 'CRITICAL', status: 'NEW' },
        { id: 8, title: 'Issue 8888', description: 'Description 8', reporter: 'Victor', reportedDate: new Date('2024-05-08'), fixer: 'Wendy', assignee: 'Xander', priority: 'MEDIUM', status: 'ASSIGNED' },
        { id: 9, title: 'Issue 9', description: 'Description 9', reporter: 'Yara', reportedDate: new Date('2024-05-09'), fixer: 'Zane', assignee: 'Alice', priority: 'LOW', status: 'FIXED' },
        { id: 10, title: 'Issue 10', description: 'Description 10', reporter: 'Bob', reportedDate: new Date('2024-05-10'), fixer: 'Charlie', assignee: 'Dave', priority: 'HIGH', status: 'CLOSED' },
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
