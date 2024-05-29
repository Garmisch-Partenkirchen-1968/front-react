import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueDetailPage.css';
import { useParams } from 'react-router-dom';

const IssueDetailPage = ({ userInfo }) => {
    const [issue, setIssue] = useState(null);
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('');
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const { projectId, issueId } = useParams();

    useEffect(() => {
        fetchIssueDetails();
    }, []);

    const fetchIssueDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/projects/${projectId}/issues/${issueId}`, {
                params: {
                    username: userInfo.username,
                    password: userInfo.password
                }
            });
            const data = response.data;
            setIssue(data);
            setStatus(data.status);
            const descriptionComment = data.comments.find(comment => comment.isDescription);
            setDescription(descriptionComment ? descriptionComment.content : '');
        } catch (error) {
            console.error('Error fetching issue details:', error);
        }
    };

    const updateDescription = async () => {
        try {
            await axios.post(`http://localhost:8080/projects/${projectId}/issues/${issueId}/comments`, {
                username: userInfo.username,
                password: userInfo.password,
                content: description,
                isDescription: true
            });
            alert('Description updated successfully');
            setIsEditingDescription(false);
            fetchIssueDetails();
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };

    const addComment = async () => {
        try {
            await axios.post(`http://localhost:8080/projects/${projectId}/issues/${issueId}/comments`, {
                username: userInfo.username,
                password: userInfo.password,
                content: comment,
                isDescription: false
            });
            alert('Comment added successfully');
            setComment('');
            fetchIssueDetails();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        try {
            await axios.patch(`http://localhost:8080/projects/${projectId}/issues/${issueId}`, {
                username: userInfo.username,
                password: userInfo.password,
                status: newStatus
            });
            alert('Status updated successfully');
            fetchIssueDetails();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (!issue) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="issue-header">
                <h1>{issue.title}</h1>
                <select value={status} onChange={handleStatusChange} className={`status ${status.toLowerCase()}`}>
                    <option value="NEW">New</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="FIXED">Fixed</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                </select>
            </div>
            <div className="issue-details">
                <div className="issue-meta">
                    <span><strong>ID:</strong> {issue.id}</span>
                    <span><strong>Reporter:</strong> {issue.reporter.username}</span>
                    <span><strong>Reported Date:</strong> {new Date(issue.reportedDate).toLocaleString()}</span>
                    <span className={`priority ${issue.priority.toLowerCase()}`}><strong>Priority:</strong> {issue.priority}</span>
                </div>
                <div className="description-container">
                    <strong>Description:</strong>
                    {isEditingDescription ? (
                        <div>
                            <textarea
                                id="description"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ minHeight: '100px' }}
                            ></textarea>
                            <button onClick={updateDescription}>Save</button>
                            <button onClick={() => setIsEditingDescription(false)}>Cancel</button>
                        </div>
                    ) : (
                        <div className="description">
                            {description || <em>No description provided.</em>}
                            <button onClick={() => setIsEditingDescription(true)}>Edit</button>
                        </div>
                    )}
                </div>
                <div><strong>Comments:</strong></div>
                <ul>
                    {issue.comments.filter(comment => !comment.isDescription).map((comment, index) => (
                        <li key={index} className="issue-item">
                            <h3>Comment {index + 1}</h3>
                            <p>{comment.content} (by {comment.commenter.username})</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="form-group">
                <label htmlFor="comment">Add Comment</label>
                <textarea id="comment" rows="2" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <button onClick={addComment}>Add Comment</button>
            </div>
        </div>
    );
};

export default IssueDetailPage;
