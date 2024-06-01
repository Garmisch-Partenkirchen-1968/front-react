import React, { useState } from 'react';
import axios from 'axios';
import './NewIssueComponent.css';

const NewIssueComponent = ({ project, userInfo, onClose, onIssueCreated }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState("MAJOR");

    const handleSubmit = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/projects/${project.id}/issues`, {
            username: userInfo.username,
            password: userInfo.password,
            title: title,
            priority: priority
        }).then((response) => {
            const issueId = response.data.id;
            onIssueCreated({ id: issueId, title: title, description: "", reportedDate: new Date(), reporter: userInfo.username, status: "New", priority: priority });
            onClose();
        }).catch((error) => {
            console.error("Failed to create Issue: ", error);
        });
    };

    return (
        <div className="new-issue-component">
            <h2>New Issue</h2>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Priority:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="MAJOR">Major</option>
                <option value="BLOCKER">Blocker</option>
                <option value="CRITICAL">Critical</option>
                <option value="MINOR">Minor</option>
                <option value="TRIVIAL">Trivial</option>
            </select>
            <button onClick={handleSubmit}>Create Issue</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default NewIssueComponent;
