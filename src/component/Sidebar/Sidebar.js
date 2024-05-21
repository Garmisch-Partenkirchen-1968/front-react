import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';
import ProjectBtn from "./ProjectBtn";
import ProjectAddBtn from "./ProjectAddBtn";
import LogoutBtn from "./LogoutBtn";

const initProjectData = [
    { projectId: "0", projectTitle: "SeaTurtle (!)" },
    { projectId: "1", projectTitle: "Garmisch1968!!!! (!)" },
    { projectId: "2", projectTitle: "GarmISSUE Manager (!)" },
    { projectId: "3", projectTitle: "Dae Chan Guen (!)" },
]

function Sidebar({ userInfo, isOpen, setIsOpen }) {
    const [showContent, setShowContent] = useState(true);
    const [showProject, setShowProject] = useState(true);
    const [projects, setProjects] = useState(initProjectData);
    const navigate = useNavigate();
    const location = useLocation();
    const currentProjectId = location.pathname.split('/').pop();

    useEffect(() => {
        const fetchProjects = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}/projects`, {
                params: {
                    username: userInfo.username,
                    password: userInfo.password
                }
            }).then((response) => {
                if (Array.isArray(response.data)) {
                    const formattedProjects = response.data.map(project => ({
                        projectId: project.id.toString(),
                        projectTitle: project.title
                    }));
                    setProjects(formattedProjects);
                } else {
                    console.error('Response data is not an array');
                }
            }).catch((error) => {
                console.error('Failed to fetch projects:', error);
            });
        }
        fetchProjects();
    }, [userInfo]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setShowContent(true);
            }, 400);
        } else {
            setShowContent(false);
        }
    }, [isOpen]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleSidebar} className="toggle-button">
            </button>
            {showContent && (
                <div className="sidebar-content">
                    <div className="project-ctl-group">
                        <div className="recent-content">
                            <button
                                className="project-toggle"
                                onClick={() => { setShowProject(!showProject) }}
                            >
                                <i className={`fas fa-chevron-${showProject ? "down" : "right"}`}> </i>
                                <p className="project-text">Projects</p>
                            </button>
                            {showProject && (
                                <div>
                                    {projects.map(item => (
                                        <ProjectBtn
                                            key={item.projectId}
                                            title={item.projectTitle}
                                            isActive={currentProjectId === item.projectId}
                                            onNavigate={() => handleNavigation(`/project/${item.projectId}`)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <ProjectAddBtn onNavigate={() => handleNavigation('/newproject')} />
                    </div>
                    <LogoutBtn />
                </div>
            )}
        </div>
    );
}

export default Sidebar;
