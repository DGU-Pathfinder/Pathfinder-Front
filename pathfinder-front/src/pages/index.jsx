import React from "react"
import { Routes, Route } from "react-router-dom";

import AppLayout from "../components/AppLayout";
// import RtImageList from "./RtImageList";
import UserRegister from "./accounts/UserRegister";
import UserLogin from "./accounts/UserLogin";
import RtImageList from "./RtImageList";

function Root() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<RtImageList />} />
                <Route path="/registration" element={<UserRegister />} />
                <Route path="/login" element={<UserLogin />} />
                {/* 기타 라우트 */}
            </Routes>
        </AppLayout>
    );
}

export default Root;