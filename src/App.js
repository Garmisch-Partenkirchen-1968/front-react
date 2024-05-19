import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./component/LoginPage/LoginPage";
import MainPage from "./component/MainPage/MainPage";
import ProjectInfoPage from "./component/MainPage/MainContent/ProjectInfoPage/ProjectInfoPage";
import NewProjectPage from "./component/MainPage/MainContent/NewProjectPage/NewProjectPage";
import Layout from "./component/Layout";

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/login" element={!isLogin ? (
                        <LoginPage setIsLogin={setIsLogin} setUserInfo={setUserInfo} />
                    ) : (
                        <Navigate to="/main" />
                    )} />
                    <Route path="/" element={isLogin ? <Layout userInfo={userInfo} /> : <Navigate to="/login" />}>
                        <Route path="main" element={<MainPage userInfo={userInfo} />} />
                        <Route path="project/:projectId" element={<ProjectInfoPage />} />
                        <Route path="newproject" element={<NewProjectPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to={isLogin ? "/main" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
