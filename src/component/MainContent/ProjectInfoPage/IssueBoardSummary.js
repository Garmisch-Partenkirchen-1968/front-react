import React from 'react';
import './IssueBoardSummary.css';
import './IssueBoard/IssueBoard.css';
import IssueItem from "./IssueBoard/IssueItem";

const IssueBoardSummary = ({ issues, maxIssuesToShow, handleViewMore }) => {
    return (
        <div className="issue-board-summary">
            <h2>Issue Board Summary</h2>
            {issues.slice(0, maxIssuesToShow).map((issue) => (
                <IssueItem issue={issue}/>
            ))}
            <button className="view-more-button" onClick={handleViewMore}>View More</button>
        </div>
    );
};

export default IssueBoardSummary;
