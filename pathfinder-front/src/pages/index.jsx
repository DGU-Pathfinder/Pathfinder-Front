import React from "react"
import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout";
import UserRegister from "./accounts/UserRegister";
import UserLogin from "./accounts/UserLogin";
import RtImageList from "./RtImageList/RtImageList";
import UploadImage from "./UploadImage/UploadImage";
import RtImageDetail from "./RtImageDetail/RtImageDetail";
import TokenProvider from "../components/JwtAuth/TokenProvider";

function Root() {
    return (
        <TokenProvider>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<RtImageList />} />
                    <Route path="/rt-image/:id" element={<RtImageDetail />} />
                    <Route path="/upload-image" element={<UploadImage />} />
                    <Route path="/registration" element={<UserRegister />} />
                    <Route path="/login" element={<UserLogin />} />
                </Routes>
            </AppLayout>
        </TokenProvider>
    );
}

export default Root;