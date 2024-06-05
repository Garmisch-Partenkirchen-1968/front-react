import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueDetailPage.css';
import { useParams } from 'react-router-dom';

const IssueDetailPage = ({ userInfo }) => {
    const [issue, setIssue] = useState(null);
    const [description, setDescription] = useState('');
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('MAJOR');
    const [assignee, setAssignee] = useState('');
    const [projectMembers, setProjectMembers] = useState([]);
    const [recommendedAssignees, setRecommendedAssignees] = useState([]);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const { projectId, issueId } = useParams();

    useEffect(() => {
        fetchProjectMembers();
        fetchIssueDetails().then(() => {
            fetchRecommendedAssignees();
        });
    }, []);

    const fetchIssueDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}/issues/${issueId}`, {
                params: {
                    username: userInfo.username,
                    password: userInfo.password
                }
            });
            const data = response.data;
            setIssue(data);
            setStatus(data.status);
            setPriority(data.priority);
            console.log(data.priority);
            setAssignee(data.assignee?.username || '');
            const descriptionComment = data.comments.find(comment => comment.isDescription);
            setDescription(descriptionComment ? descriptionComment.content : '');
        } catch (error) {
            console.error('Error fetching issue details:', error);
        }
    };

    const fetchProjectMembers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
                params: {
                    username: userInfo.username,
                    password: userInfo.password
                }
            });
            const data = response.data;
            const members = Object.entries(data.members).map(([key, permission]) => {
                const userMatch = key.match(/User\(id=(\d+), username=(.+?), password=(.+?)\)/);
                return { id: userMatch[1], username: userMatch[2], permission: permission };
            });
            const devMembers = members.filter(member => {
                const binaryPermission = member.permission.toString(2).padStart(4, '0');
                return binaryPermission[3] === '1'; // 4번째 비트 체크 (0-indexed)
            });
            setProjectMembers(devMembers);
        } catch (error) {
            console.error('Error fetching project members:', error);
        }
    };

    const fetchRecommendedAssignees = async () => {
        axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}/recommend-assignee`, {
            params: {
                username: userInfo.username,
                password: userInfo.password,
                priority: priority
            }
        }).then((response) => {
            setRecommendedAssignees(response.data);
        }).catch((error) => {
            console.error('Error fetching recommended assignees:', error);
        });
    };

    const updateDescription = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/projects/${projectId}/issues/${issueId}/comments`, {
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
            await axios.post(`${process.env.REACT_APP_API_URL}/projects/${projectId}/issues/${issueId}/comments`, {
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
            await axios.patch(`${process.env.REACT_APP_API_URL}/projects/${projectId}/issues/${issueId}`, {
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

    const handleAssigneeChange = async (member) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/projects/${projectId}/issues/${issueId}`, {
                username: userInfo.username,
                password: userInfo.password,
                assignee: member.username
            });
            alert('Assignee updated successfully');
            setAssignee(member.username);
            fetchIssueDetails();
        } catch (error) {
            console.error('Error updating assignee:', error);
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
                    <option value="REOPENED">Reopened</option>
                </select>
            </div>
            <div className="issue-details">
                <div className="issue-meta">
                    <span><strong>ID:</strong> {issue.id}</span>
                    <span><strong>Reporter:</strong> {issue.reporter ? issue.reporter.username : 'No Reporter'}</span>
                    <span><strong>Reported Date:</strong> {issue.reportedDate ? new Date(issue.reportedDate).toLocaleString() : 'No Reported Date'}</span>
                    <span><strong>Fixer:</strong> {issue.fixer ? issue.fixer.username : 'No Fixer'}</span>
                    <span><strong>Assignee:</strong> {assignee || 'No Assignee'}</span>
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
                <div className="recommended-assignees">
                    <h3>Recommended Developers</h3>
                    {recommendedAssignees.length > 0 ? (
                        <ul>
                            {recommendedAssignees.map(dev => (
                                <li key={dev.id}>{dev.username}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recommended assignees</p>
                    )}
                </div>
                <div className="assignee-selection">
                    <h3>Select Assignee</h3>
                    {projectMembers.length > 0 ? (
                        <ul>
                            {projectMembers.map(member => (
                                <li key={member.id}>
                                    <input
                                        type="radio"
                                        id={`assignee-${member.username}`}
                                        name="assignee"
                                        value={member.username}
                                        checked={assignee === member.username}
                                        onChange={() => handleAssigneeChange(member)}
                                    />
                                    <label htmlFor={`assignee-${member.username}`}>{member.username}</label>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No available assignees</p>
                    )}
                </div>
                <div><strong>Comments:</strong></div>
                <ul>
                    {issue.comments.filter(comment => !comment.isDescription).map((comment, index) => (
                        <li key={index} className="issue-item">
                            <h3>{comment.content}</h3>
                            <p>by {comment.commenter.username} | {new Date(comment.commentedDate).toLocaleString()}</p>
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
