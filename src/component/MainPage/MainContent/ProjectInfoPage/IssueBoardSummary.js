import React from 'react';
import './IssueBoardSummary.css';

const IssueBoardSummary = ({ issues, maxIssuesToShow, setShowIssueBoard }) => {

    function onClickHandle() {
        setShowIssueBoard(true);
    }

    return (
        <div className="issue-board-summary">
            <h2>Issue Board Summary</h2>
            <div className="issue-list-summary">
                {issues.slice(0, maxIssuesToShow).map((issue) => (
                    <div key={issue.id} className="issue-item-summary">
                        <h3>{issue.title}</h3>
                        <p>Date: {issue.date.toLocaleDateString()}</p>
                        <p>Status: {issue.status}</p>
                    </div>
                ))}
            </div>
            <button onClick={onClickHandle}> View More </button>
        </div>
    );
};

export default IssueBoardSummary;
