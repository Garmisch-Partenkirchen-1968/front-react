// src/components/Layout.js

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

function Layout({ userInfo, setProject, projects, setProjects }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="main-page">
            <Header isOpen={isOpen} />
            <div className="content">
                <Sidebar
                    userInfo={userInfo}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    projects={projects}
                    setProjects={setProjects}
                />
                <div className={`main-content ${isOpen ? "open" : "closed"}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
