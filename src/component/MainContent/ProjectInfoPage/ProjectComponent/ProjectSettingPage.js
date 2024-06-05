import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectSettingPage.css';

const ProjectSettingPage = ({ userInfo }) => {
    const { projectId } = useParams();
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
            params: {
                username: userInfo.username,
                password: userInfo.password,
            },
        }).then(async (response) => {
            const membersData = response.data.members;
            const parsedMembers = Object.entries(membersData).map(([userString]) => {
                const userMatch = userString.match(/User\(id=(\d+), username=(\w+), password=(.+)\)/);
                if (userMatch) {
                    const [_, id, username, password] = userMatch;
                    return {
                        id: parseInt(id, 10),
                        username,
                        password,
                        permissions: [false, false, false, false]  // Default permissions until fetched
                    };
                }
                return null;
            }).filter(member => member !== null);

            // Fetch permissions for each member
            const membersWithPermissions = await Promise.all(parsedMembers.map(async (member) => {
                try {
                    const permissionResponse = await axios.get(
                        `${process.env.REACT_APP_API_URL}/projects/${projectId}/permissions/${member.id}`, {
                            params: {
                                username: userInfo.username,
                                password: userInfo.password,
                            },
                        }
                    );
                    return { ...member, permissions: permissionResponse.data };
                } catch (error) {
                    console.error(`Failed to fetch permissions for member ${member.username}:`, error);
                    return member;
                }
            }));

            setMembers(membersWithPermissions);
        }).catch((error) => {
            console.error('Failed to fetch project members:', error);
        });
    }, [projectId, userInfo]);

    const handleSearchUsers = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/users`, {
            params: {
                keyword: searchQuery,
                username: userInfo.username,
                password: userInfo.password,
            },
        }).then((response) => {
            setSearchResults(response.data);
        }).catch((error) => {
            console.error('Error searching users:', error);
        });
    };

    const handleAddMember = (user) => {
        const newMember = { ...user, permissions: [false, false, false, true] };
        axios.post(`${process.env.REACT_APP_API_URL}/projects/${projectId}/permissions/${user.id}`, {
            username: userInfo.username,
            password: userInfo.password,
            permissions: newMember.permissions
        }).then(() => {
            setMembers([...members, newMember]);
            setSearchResults([]);
            setSearchQuery('');
        }).catch((error) => {
            console.error('Error adding member:', error);
        });
    };

    const handlePermissionChange = (username, permissionIndex) => {
        const member = members.find(member => member.username === username);
        if (!member) return;

        const updatedPermissions = [...member.permissions];
        updatedPermissions[permissionIndex] = !updatedPermissions[permissionIndex];

        axios.patch(`${process.env.REACT_APP_API_URL}/projects/${projectId}/permissions/${member.id}`, {
            username: userInfo.username,
            password: userInfo.password,
            permissions: updatedPermissions,
        }).then(() => {
            setMembers(members.map(m =>
                m.username === username ? { ...m, permissions: updatedPermissions } : m
            ));
        }).catch((error) => {
            console.error('Error updating permissions:', error);
        });
    };

    const handleRemoveMember = (delMember) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}/permissions/${delMember.id}`, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data:{
                username: userInfo.username,
                password: userInfo.password,
            }
        }).then(() => {
            setMembers(members.filter(member => member.username !== delMember.username));
        }).catch((error) => {
            console.error('Error removing member:', error);
        });
    };

    return (
        <div className="project-setting-page">
            <button className="back-button" onClick={() => navigate(`/project/${projectId}`)}>Back</button>
            <h1>Project Settings</h1>
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
                        <li key={user.id}>
                            {user.username}
                            <button onClick={() => handleAddMember(user)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="members-list">
                {members.length > 0 ? members.map(member => (
                    <div key={member.username} className="member-item">
                        <span>{member.username}</span>
                        <div className="permissions">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={member.permissions[0]}
                                    onChange={() => handlePermissionChange(member.username, 0)}
                                />
                                Admin
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={member.permissions[1]}
                                    onChange={() => handlePermissionChange(member.username, 1)}
                                />
                                Project Leader
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={member.permissions[2]}
                                    onChange={() => handlePermissionChange(member.username, 2)}
                                />
                                Tester
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={member.permissions[3]}
                                    onChange={() => handlePermissionChange(member.username, 3)}
                                />
                                Developer
                            </label>
                        </div>
                        <button onClick={() => handleRemoveMember(member)}>Remove</button>
                    </div>
                )) : <p>No members found.</p>}
            </div>
        </div>
    );
};

export default ProjectSettingPage;
