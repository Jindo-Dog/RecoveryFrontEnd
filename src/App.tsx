import React from "react";
import "./App.scss";
import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./component/auth/login.tsx";
import MemoirsList from "./component/memoirs/memoirsList.tsx";
import SignUp from "./component/auth/signup.tsx";

function App() {
    return (
        <div id={"App"}>
            <h1 className={"blind"}>Recovery - 회고 피드백 서비스</h1>
            <React.Suspense>
                <Routes>
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/"} element={<MemoirsList />} />
                    <Route path={"/signup"} element={<SignUp/>}/>
                </Routes>
            </React.Suspense>
        </div>
    );
}

export default App;
