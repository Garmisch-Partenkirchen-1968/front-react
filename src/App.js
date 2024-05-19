import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./component/LoginPage/LoginPage";
import MainPage from "./component/MainContent/MainPage/MainPage";
import ProjectInfoPage from "./component/MainContent/ProjectInfoPage/ProjectInfoPage";
import NewProjectPage from "./component/MainContent/NewProjectPage/NewProjectPage";
import IssueBoard from "./component/MainContent/ProjectInfoPage/IssueBoard/IssueBoard";
import Layout from "./component/Layout";

const ProjectData = {
    name: 'Project Alpha',
    description: 'This is a sample project description.',
    startDate: new Date('2024-05-01'),
    issues: [
        { id: 1, title: 'Issue 1', description: 'Description 1', reporter: 'Alice', reportedDate: new Date('2024-05-01'), fixer: 'Bob', assignee: 'Charlie', priority: 'HIGH', status: 'NEW' },
        { id: 2, title: 'Issue 2', description: 'Description 2', reporter: 'Dave', reportedDate: new Date('2024-05-02'), fixer: 'Eve', assignee: 'Frank', priority: 'MEDIUM', status: 'CLOSED' },
        { id: 3, title: 'Issue 3', description: 'Description 3', reporter: 'Grace', reportedDate: new Date('2024-05-03'), fixer: 'Heidi', assignee: 'Ivan', priority: 'LOW', status: 'FIXED' },
        { id: 4, title: 'Issue 4', description: 'Description 4', reporter: 'Jack', reportedDate: new Date('2024-05-04'), fixer: 'Kathy', assignee: 'Leo', priority: 'CRITICAL', status: 'RESOLVED' },
        { id: 5, title: 'Issue 5', description: 'Description 5', reporter: 'Mallory', reportedDate: new Date('2024-05-05'), fixer: 'Niaj', assignee: 'Oscar', priority: 'HIGH', status: 'ASSIGNED' },
        { id: 6, title: 'Issue 6', description: 'Description 6', reporter: 'Pat', reportedDate: new Date('2024-05-06'), fixer: 'Quinn', assignee: 'Riley', priority: 'LOW', status: 'OPEN' },
        { id: 7, title: 'Issue 7', description: 'Description 7', reporter: 'Sam', reportedDate: new Date('2024-05-07'), fixer: 'Trudy', assignee: 'Uma', priority: 'CRITICAL', status: 'NEW' },
        { id: 8, title: 'Issue 8', description: 'Description 8', reporter: 'Victor', reportedDate: new Date('2024-05-08'), fixer: 'Wendy', assignee: 'Xander', priority: 'MEDIUM', status: 'ASSIGNED' },
        { id: 9, title: 'Issue 9', description: 'Description 9', reporter: 'Yara', reportedDate: new Date('2024-05-09'), fixer: 'Zane', assignee: 'Alice', priority: 'LOW', status: 'FIXED' },
        { id: 10, title: 'Issue 10', description: 'Description 10', reporter: 'Bob', reportedDate: new Date('2024-05-10'), fixer: 'Charlie', assignee: 'Dave', priority: 'HIGH', status: 'CLOSED' },
    ],
};


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
                        <Route path="project/:projectId" element={<ProjectInfoPage userInfo={userInfo} ProjectData={ProjectData}/>}/>
                        <Route path="project/:projectId/issueboard" element={<IssueBoard userInfo={userInfo} issues={ProjectData.issues}/>} />
                        <Route path="newproject" element={<NewProjectPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to={isLogin ? "/main" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
