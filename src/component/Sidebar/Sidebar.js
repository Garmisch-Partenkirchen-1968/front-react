import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import ProjectBtn from "./ProjectBtn";
import ProjectAddBtn from "./ProjectAddBtn";
import LogoutBtn from "./LogoutBtn";

function Sidebar({ userInfo, isOpen, setIsOpen }) {
    const [showContent, setShowContent] = useState(true);
    const [showProject, setShowProject] = useState(true);
    const [projects, setProjects] = useState([
        { projectId: "0", projectTitle: "SeaTurtle" },
        { projectId: "1", projectTitle: "Garmisch1968!!!!" },
        { projectId: "2", projectTitle: "GarmISSUE Manager" },
        { projectId: "3", projectTitle: "Dae Chan Guen" },
    ]);
    const navigate = useNavigate();
    const location = useLocation();
    const currentProjectId = location.pathname.split('/').pop();

    //TODO : userInfo를 이용해 API 콜, projectID와 projectTitle을 받아와야함
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // 프로젝트 데이터 가져오기 로직 추가
            } catch (error) {
                setProjects([
                    { projectId: "0", projectTitle: "SeaTurtle (!)"},
                    { projectId: "1", projectTitle: "Garmisch1968!!!! (!)"},
                    { projectId: "2", projectTitle: "GarmISSUE Manager (!)"},
                    { projectId: "3", projectTitle: "Dae Chan Guen (!)"},
                ]);
            }
        };
        fetchProjects();
    }, []);

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
