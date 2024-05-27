import React from 'react';
import './IssueBoardSummary.css';
import '../IssueBoard/IssueBoard.css';
import IssueItem from "../IssueBoard/IssueItem";

const IssueBoardSummary = ({ issues, maxIssuesToShow, handleViewMore, handleNewIssue }) => {
    return (
        <div className="issue-board-summary">
            <div className="view-more-container">
                <button className="view-more-button" onClick={handleViewMore}>View More</button>
            </div>
            {issues.slice(0, maxIssuesToShow).map((issue) => (
                <IssueItem key={issue.id} issue={issue}/>
            ))}
        </div>
    );
};

export default IssueBoardSummary;
