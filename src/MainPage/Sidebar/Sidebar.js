import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import ProjectBtn from "./ProjectBtn";

function Sidebar({userInfo, isOpen, setIsOpen, projectId, setProjectId}) {
    const [showContent, setShowContent] = useState(true); // 컨텐츠 표시 상태 관리
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
                    <div className="recent-content">
                        <p className="recent-text">Projects</p>
                        {projects.map(item => (
                            <ProjectBtn
                                key={item.projectId}
                                title={item.projectTitle}
                                projectId={item.projectId}
                                setProjectId={setProjectId}
                                isActive={projectId=== item.projectId}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
