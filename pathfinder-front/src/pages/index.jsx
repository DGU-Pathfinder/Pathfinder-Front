import React from "react"
import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import AppLayout from "../components/AppLayout";
import UserRegister from "./accounts/UserRegister";
import UserLogin from "./accounts/UserLogin";
import RtImageList from "./RtImageList";
import UploadImage from "./UploadImage";

function Root() {
    return (
        <AppLayout>
            <Routes>
                <Route path="/" element={<RtImageList />} />
                <Route path="/upload-image" element={<UploadImage />} />
                <Route path="/registration" element={<UserRegister />} />
                <Route path="/login" element={<UserLogin />} />
            </Routes>
        </AppLayout>
    );
}

export default Root;