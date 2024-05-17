import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import ProjectBtn from "./ProjectBtn";
import ProjectAddBtn from "./ProjectAddBtn";
import LogoutBtn from "./LogoutBtn";

function Sidebar({userInfo, isOpen, setIsOpen, projectId, setProjectId, contentType, setContentType}) {
    const [showContent, setShowContent] = useState(true); // 컨텐츠 표시 상태 관리
    const [showProject, setShowProject] = useState(true); // 프로젝트 표시 상태 관리
    const [projects, setProjects] = useState([
        {projectId: "0", projectTitle: "SeaTurtle"},
        {projectId: "1", projectTitle: "Garmisch1968!!!!"},
        {projectId: "2", projectTitle: "GarmISSUE Manager"},
        {projectId: "3", projectTitle: "Dae Chan Guen"},
    ]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
            } catch (error) {
                setProjects([
                    {projectId: "0", projectTitle: "SeaTurtle (!)"},
                    {projectId: "1", projectTitle: "Garmisch1968!!!! (!)"},
                    {projectId: "2", projectTitle: "GarmISSUE Manager (!)"},
                    {projectId: "3", projectTitle: "Dae Chan Guen (!)"},
                ])
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setShowContent(true);
            }, 400); // 0.5초 후에 내용을 표시
        } else {
            setShowContent(false);
        }
    }, [isOpen]); // isOpen이 변경될 때마다 이 효과를 실행

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleSidebar} className="toggle-button">
            </button>
            {showContent && (
                <div className="sidebar-content">
                    <div className="prject-ctl-group">
                        <div className="recent-content">
                            <button
                                className="project-toggle"
                                onClick={() => {setShowProject(!showProject)}}
                            >
                                <i className={`fas fa-chevron-${ showProject ? "down" : "right"}`}> </i>
                                <p className="project-text">Projects</p>
                            </button>
                            {showProject && (
                                <div>
                                    {projects.map(item => (
                                        <ProjectBtn
                                            key={item.projectId}
                                            title={item.projectTitle}
                                            projectId={item.projectId}
                                            setProjectId={setProjectId}
                                            setContentType={setContentType}
                                            isActive={contentType === "project" && projectId === item.projectId}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <ProjectAddBtn
                            setContentType={setContentType}
                            isActive={contentType === "newProject"}
                        />
                    </div>
                    <LogoutBtn/>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
