import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./component/LoginPage/LoginPage";
import MainPage from "./component/MainContent/MainPage/MainPage";
import ProjectInfoPage from "./component/MainContent/ProjectInfoPage/ProjectInfoPage";
import ProjectSettingPage from "./component/MainContent/ProjectInfoPage/ProjectComponent/ProjectSettingPage";
import NewProjectPage from "./component/MainContent/NewProjectPage/NewProjectPage";
import IssueBoard from "./component/MainContent/ProjectInfoPage/IssueBoard/IssueBoard";
import Layout from "./component/Layout";

const initProjectData = [
    {
        id: "0",
        name: "SeaTurtle (!)",
        description: "sea turtle project",
        members : {
            "User(id=332, username=admin1, password=pw)" : 15,
            "User(id=333, username=admin2, password=pw)" : 8,
            "User(id=334, username=pl1, password=pw)" : 4,
            "User(id=335, username=tester1, password=pw)" : 2,
            "User(id=336, username=testdev1, password=pw)" : 3,
            "User(id=337, username=dev2, password=pw)" : 1,
        },
    },
    { id: "1", name: "Garmisch1968!!!! (!)" },
    { id: "2", name: "GarmISSUE Manager (!)" },
    { id: "3", name: "Dae Chan Guen (!)" },
]

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [projects, setProjects] = useState(initProjectData);

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/login" element={!isLogin ? (
                        <LoginPage setIsLogin={setIsLogin} setUserInfo={setUserInfo} />) : (<Navigate to="/main" />)} />
                    <Route path="/" element={isLogin ?
                        <Layout userInfo={userInfo} projects={projects} setProjects={setProjects}/> : <Navigate to="/login" />}>
                        <Route path="main" element={<MainPage userInfo={userInfo} />} />
                        <Route path="project/:projectId" element={<ProjectInfoPage userInfo={userInfo}/>}/>
                        <Route path="project/:projectId/issueboard" element={<IssueBoard userInfo={userInfo}/>} />
                        <Route path="/project/:projectId/settings" element={<ProjectSettingPage userInfo={userInfo} />} />
                        <Route path="newproject" element={<NewProjectPage userInfo={userInfo}/>} />
                    </Route>
                    <Route path="*" element={<Navigate to={isLogin ? "/main" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
