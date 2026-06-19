import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
// auth
import Login from "../pages/auth/Login";
import SelectMemberPage from "../pages/auth/SelectMemberPage";
import Home from "../pages/Home";
import SamplePage1 from "../pages/sample/SamplePage1";
import SamplePage2 from "../pages/sample/SamplePage2";

// settings - system administration
import BusinessInfo from "../pages/settings/system-administration/business-info/BusinessInfo";

// settings - system setting
import UserManagement from "../pages/appSettings/UserManagement/UserManagement";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}
        <Route
          path="/select-member"
          element={
            <ProtectedRoute>
              <SelectMemberPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* CHILDREN ROUTES */}
          <Route index element={<Home />} />
          {/* 🔥 SAMPLE PAGES */}
          <Route path="sample-page/page1" element={<SamplePage1 />} />
          <Route path="sample-page/page2" element={<SamplePage2 />} />

          {/* SETTINGS - SYSTEM ADMINISTRATION */}
          <Route path="se/adm/business-info" element={<BusinessInfo />} />
          {/* <Route path="se/sys/user-management" element={<UserManagement />} /> */}
          <Route path="se/adm/user-management" element={<UserManagement />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}