import './App.css';
import {useState} from "react";
import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";

function App() {
  const[islogin, setIsLogin] = useState(false);
  const[userInfo, setUserInfo] = useState();

  return (
      <div className="app">
        {(!islogin) ?
            //Login Page를 띄워서 로그인 또는 회원가입 하도록.
              <LoginPage
                  setIsLogin={setIsLogin}
                  setUserInfo={setUserInfo}
              /> :
            //로그인 되어있으면 main Page로 접속하도록
              <MainPage
                  userInfo={userInfo}
              />
        }
      </div>
  );
}

export default App;