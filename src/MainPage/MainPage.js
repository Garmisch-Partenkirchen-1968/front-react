import React, {useState} from 'react';
import './MainPage.css';
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
import Header from "./Header/Header";

function MainPage( {userInfo} ) {
    const [isOpen, setIsOpen] = useState(true);
    //선택된 project의 ID
    const [projectId, setProjectId] = useState();
    const [contentType, setContentType] = useState("project");

    return (
        <div className="main-page">
            <Header isOpen={isOpen}/>
            <div className="content">
                <Sidebar
                    userInfo={userInfo}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    projectId={projectId}
                    setProjectId={setProjectId}
                    contentType={contentType}
                    setContentType={setContentType}
                />
                <div className={`main-content ${isOpen ? "open" : "closed"}`}>
                    <MainContent
                        userInfo={userInfo}
                        projectId={projectId}
                        setContentType={setContentType}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
