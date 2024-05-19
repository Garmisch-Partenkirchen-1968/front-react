import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./component/LoginPage/LoginPage";
import MainPage from "./component/MainContent/MainPage/MainPage";
import ProjectInfoPage from "./component/MainContent/ProjectInfoPage/ProjectInfoPage";
import NewProjectPage from "./component/MainContent/NewProjectPage/NewProjectPage";
import IssueBoard from "./component/MainContent/ProjectInfoPage/IssueBoard/IssueBoard";
import Layout from "./component/Layout";

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/login" element={!isLogin ? (
                        <LoginPage setIsLogin={setIsLogin} setUserInfo={setUserInfo} />) : (<Navigate to="/main" />)} />
                    <Route path="/" element={isLogin ?
                        <Layout userInfo={userInfo} /> : <Navigate to="/login" />}>
                        <Route path="main" element={<MainPage userInfo={userInfo} />} />
                        <Route path="project/:projectId" element={<ProjectInfoPage userInfo={userInfo}/>}/>
                        <Route path="project/:projectId/issueboard" element={<IssueBoard userInfo={userInfo}/>} />
                        <Route path="newproject" element={<NewProjectPage userInfo={userInfo}/>} />
                    </Route>
                    <Route path="*" element={<Navigate to={isLogin ? "/main" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
