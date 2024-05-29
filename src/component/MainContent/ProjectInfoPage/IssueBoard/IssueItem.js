import React from 'react';
import './IssueItem.css';
import { useNavigate, useParams } from 'react-router-dom';

const IssueItem = ({ issue }) => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const formatUser = (user) => {
        if (typeof user === 'object' && user !== null) {
            return user.username; // 객체의 username 속성을 사용하여 렌더링
        }
        return user;
    };

    const formatAssignees = (assignees) => {
        if (Array.isArray(assignees)) {
            return assignees.map((assignee, index) => (
                <span key={index} className="assignee">{formatUser(assignee)}</span>
            ));
        }
        return assignees;
    };

    // comments 배열에서 isDescription이 true인 항목을 찾아 description으로 설정
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
                <span>Reporter: {formatUser(issue.reporter)}</span>
                <span>Reported Date: {new Date(issue.reportedDate).toLocaleDateString()}</span>
                <span>Fixer: {formatUser(issue.fixer)}</span>
                <span>Assignees: {formatAssignees(issue.assignees)}</span>
                <span className={`priority ${issue.priority.toLowerCase()}`}>Priority: {issue.priority}</span>
            </div>
        </div>
    );
};

export default IssueItem;
