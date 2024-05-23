import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const initData = {
    id: '',
    username: '',
    password: '',
    passwordCheck: ''
};

function LoginPage({ setUserInfo, setIsLogin }) {
    const [isSignIn, setIsSignIn] = useState(false);
    const [formData, setFormData] = useState(initData);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        if (formData.username.length < 3 || formData.password.length < 3) {
            alert("⚠️모든 필드는 적어도 3글자 이상이어야 합니다.");
            return;
        }
            axios.get(`${process.env.REACT_APP_API_URL}/signin`, {
                params: {
                    username: formData.username,
                    password: formData.password
                }
            }).then((response) => {
                const id = response.data;
                setUserInfo({ username: formData.username, id: id, password: formData.password });
                setIsLogin(true); // Set login state to true
            }).catch((error) => {
                console.error('Login failed:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert('An unknown error occurred.');
                }
            });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const { password, username, passwordCheck } = formData;
        if (password.length < 3 || username.length < 3) {
            alert("⚠️모든 필드는 적어도 3글자 이상이어야 합니다.");
            return;
        }
        if (password !== passwordCheck) {
            alert("⚠️Password가 Password Check와 일치하지 않습니다.");
            return;
        }
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
            "username": username,
            "password": password
        }).then(() => {
            alert('🎊가입을 축하드립니다!🎊');
            setIsSignIn(false);
        }).catch((error) => {
            console.error('Registration failed:', error);
            alert('Registration failed, please try again.');
        });
        setFormData(initData);
    };

    const onClickHandle = (event) => {
        event.preventDefault();
        setIsSignIn(!isSignIn);
        setFormData(initData);
    };

    return (
        <div className="login-page">
            <div className="login-group">
                <h1 className="title">GARMISSUE</h1>
                <h3 className="team"> - Team03 GARMISCH1968 - </h3>
                {isSignIn ? (
                    <form className="login-form" onSubmit={handleRegister}>
                        <input className="inputfield" placeholder="Username" type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
                        <input className="inputfield" placeholder="Password" type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                        <input className="inputfield" placeholder="Password Check" type="password" id="passwordCheck" name="passwordCheck" value={formData.passwordCheck} onChange={handleInputChange} />
                        <button type="submit" className="signup-button">가입하기</button>
                    </form>
                ) : (
                    <form className="login-form" onSubmit={handleLogin}>
                        <input className="inputfield" placeholder="Username" type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
                        <input className="inputfield" placeholder="Password" type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                        <button type="submit" className="login-button">로그인</button>
                        <button type="button" onClick={onClickHandle} className="signup-toggle-button">회원가입</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default LoginPage;
