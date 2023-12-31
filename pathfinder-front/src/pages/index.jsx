import React from "react"
import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout/AppLayout";
import UserRegister from "./accounts/UserRegister";
import UserLogin from "./accounts/UserLogin";
import RtImageList from "./RtImageList/RtImageList";
import UploadImage from "./UploadImage/UploadImage";
import RtImageDetail from "./RtImageDetail/RtImageDetail";
import Welder from "./welder/welder";
import NotFoundPage from "./404/NotFoundPage";

function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<RtImageList />} />
        <Route path="/rt-image/:id" element={<RtImageDetail />} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/welder" element={<Welder />} />
        <Route path="/registration" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
}

export default Root;