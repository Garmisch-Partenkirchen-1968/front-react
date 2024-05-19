import React, { useState } from 'react';
import axios from 'axios';
import './NewProjectPage.css';

const NewProjectPage = ({userInfo}) => {
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleCreateProject = async () => {
        const finalTitle = projectTitle.trim() === '' ? 'untitled' : projectTitle.trim();
        const finalDescription = projectDescription.trim() === '' ? 'untitled' : projectDescription.trim();

        const membersData = members.map(member => ({
            username: member.username,
            permissions: member.permissions
        }));

        const payload = {
            username: userInfo.username,
            password: userInfo.password,
            projectName: finalTitle,
            description: finalDescription,
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/projects', payload);
            console.log('Project created:', response.data);
            alert('New project created successfully!');
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project');
        }
    };

    const handleSearchUsers = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/users?username=${searchQuery}`);
            console.log(response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleAddMember = (user) => {
        setMembers([...members, { ...user, permissions: 0 }]);
        setSearchResults([]);
        setSearchQuery('');
    };

    const handlePermissionChange = (username, permission) => {
        setMembers(members.map(member =>
            member.username === username
                ? { ...member, permissions: member.permissions ^ (1 << permission) }
                : member
        ));
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
            <div className="member-search">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Members"
                />
                <button onClick={handleSearchUsers}>Search</button>
                <ul>
                    {searchResults.map(user => (
                        <li key={user.username}>
                            {user.username}
                            <button onClick={() => handleAddMember(user)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="members-list">
                {members.map(member => (
                    <div key={member.username} className="member-item">
                        <span>{member.username}</span>
                        <div className="permissions">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={!!(member.permissions & (1 << 0))}
                                    onChange={() => handlePermissionChange(member.username, 0)}
                                />
                                Admin
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={!!(member.permissions & (1 << 1))}
                                    onChange={() => handlePermissionChange(member.username, 1)}
                                />
                                Project Leader
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={!!(member.permissions & (1 << 2))}
                                    onChange={() => handlePermissionChange(member.username, 2)}
                                />
                                Tester
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={!!(member.permissions & (1 << 3))}
                                    onChange={() => handlePermissionChange(member.username, 3)}
                                />
                                Developer
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleCreateProject}>Create Project</button>
        </div>
    );
};

export default NewProjectPage;
