import React, { useState } from 'react';
import './IssueBoard.css';

const IssueBoard = ({issues, setIssues}) => {
    const [sortOption, setSortOption] = useState('date'); // 기본 정렬 옵션: 날짜

    // 정렬 함수
    const sortIssues = (option) => {
        let sortedIssues;
        if (option === 'date') {
            sortedIssues = [...issues].sort((a, b) => b.date - a.date);
        } else if (option === 'title') {
            sortedIssues = [...issues].sort((a, b) => a.title.localeCompare(b.title));
        } else if (option === 'status') {
            sortedIssues = [...issues].sort((a, b) => a.status.localeCompare(b.status));
        }
        setIssues(sortedIssues);
    };

    // 새로운 이슈 추가 함수
    const addIssue = (title) => {
        const newIssue = {
            id: issues.length + 1,
            title: title,
            date: new Date(),
            status: 'Open',
        };
        setIssues([...issues, newIssue]);
    };

    return (
        <div className="issue-board">
            <h1>Issue Board</h1>
            <div className="controls">
                <div>
                    <label>Sort by: </label>
                    <select onChange={(e) => sortIssues(e.target.value)} value={sortOption}>
                        <option value="date">Date</option>
                        <option value="title">Title</option>
                        <option value="status">Status</option>
                    </select>
                </div>
                <button onClick={() => addIssue(prompt('Enter issue title:'))}>New Issue</button>
            </div>
            <div className="issue-list">
                {issues.map((issue) => (
                    <div key={issue.id} className="issue-item">
                        <h3>{issue.title}</h3>
                        <p>Date: {issue.date.toLocaleDateString()}</p>
                        <p>Status: {issue.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IssueBoard;
