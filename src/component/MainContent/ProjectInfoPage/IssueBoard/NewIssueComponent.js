// NewIssueComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './NewIssueComponent.css';

const NewIssueComponent = ({ project, userInfo, onClose, onIssueCreated }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [assignee, setAssignee] = useState([]);
    const [priority, setPriority] = useState('');

    // Function to check if a member has 'dev' permissions
    const isDev = (permission) => {
        const binary = permission.toString(2).padStart(4, '0');
        return binary[3] === '1';
    };

    // Filter out members who have the 'dev' role
    const devMembers = Object.keys(project.members).filter(member => {
        const permission = project.members[member];
        return isDev(permission);
    });

    const handleAssigneeChange = (member) => {
        if (assignee.includes(member)) {
            setAssignee(assignee.filter(a => a !== member));
        } else {
            setAssignee([...assignee, member]);
        }
    };

    const handleSubmit = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/projects/${project.id}/issues`, {
            username: userInfo.username,
            password: userInfo.password,
            title: title,
            priority: priority
        }).then((response) => {
            const issueId = response.data;
            onIssueCreated({ id: issueId, title: title, description: "", reportedDate: new Date(), reporter: userInfo.username, status: "New", assignee: assignee, priority: priority });
            onClose();
        }).catch((error) => {
            console.error("Fail to create Issue : ", error);
        });
    };

    return (
        <div className="new-issue-component">
            <h2>New Issue</h2>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="NEW">New</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="FIXED">Fixed</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
            </select>
            <label>Assignee:</label>
            <div className="assignee-list">
                {devMembers.map(member => {
                    const user = member.match(/User\(id=(\d+), username=(.+?), password=(.+?)\)/);
                    const userId = user[1];
                    const username = user[2];
                    return (
                        <div key={userId} className="assignee-item">
                            <input
                                type="checkbox"
                                id={`assignee-${userId}`}
                                checked={assignee.includes(userId)}
                                onChange={() => handleAssigneeChange(userId)}
                            />
                            <label htmlFor={`assignee-${userId}`}>{username}</label>
                        </div>
                    );
                })}
            </div>
            <label>Priority:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="">Select Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
            </select>
            <button onClick={handleSubmit}>Create Issue</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default NewIssueComponent;
