import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ setUserInfo, setIsLogin }) {
    const [isSignIn, setIsSignIn] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        password: '',
        passwordCheck: ''
    });

    // Update form data as user types
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Function to handle login
    const handleLogin = async (event) => {
        event.preventDefault();
        if (formData.username.length < 3 || formData.password.length < 3) {
            alert("Username and Password must be at least 3 characters long.");
            return;
        }
        // Here you would typically send a request to your server to validate the login credentials
        try {
            // Mocking a server response as success for login
            setIsLogin(true); // Set login state to true
            setUserInfo({ username: formData.username, id: formData.id , password: formData.password});
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed, please try again.');
        }
    };

    // Function to handle registration
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
        // 회원가입 api call
        try {
            alert('🎊가입을 축하드립니다!🎊');
            setIsSignIn(false); // Switch back to login view
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed, please try again.');
        }
    };

    const onClickHandle = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className="login-page">
            <div className="login-group">
                <h1 className="title">GARMISSUE</h1>
                <h3 className="team"> - Team03 GARMISCH1968 - </h3>
                {(isSignIn) ? (
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
