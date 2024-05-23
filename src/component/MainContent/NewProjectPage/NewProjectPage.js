// NewProjectPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './NewProjectPage.css';
import { useNavigate } from "react-router-dom";

const NewProjectPage = ({ userInfo }) => {
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const navigate = useNavigate();

    const handleCreateProject = () => {
        const finalTitle = projectTitle.trim() === '' ? 'untitled' : projectTitle.trim();
        const finalDescription = projectDescription.trim() === '' ? 'untitled' : projectDescription.trim();

        const payload = {
            username: userInfo.username,
            password: userInfo.password,
            name: finalTitle,
            description: finalDescription,
        };

        axios.post(`${process.env.REACT_APP_API_URL}/projects`, payload)
            .then((response) => {
                console.log('Project created:', response.data.id);
                alert('New project created successfully!');
                navigate(`/project/${response.data.id}`);
            })
            .catch((error) => {
                console.error('Error creating project:', error);
                alert('Failed to create project');
            });
    };

    return (
        <div className="new-project-page">
            <h1>Create a New Project</h1>
            <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Project Title"
            />
            <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Project Description"
            />
            <button onClick={handleCreateProject}>Create Project</button>
        </div>
    );
};

export default NewProjectPage;
