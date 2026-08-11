import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
// auth
import Login from "../pages/auth/Login";
import SelectMemberPage from "../pages/auth/SelectMemberPage";
import Home from "../pages/Home";
import SamplePage1 from "../pages/sample/SamplePage1";
import SamplePage2 from "../pages/sample/SamplePage2";

// inventory
import WarehouseType from "../pages/inventory/tables/warehouse-type/WarehouseType";
import ProductCategory from "../pages/inventory/tables/product-category/ProductCategory";
import Warehouse from "../pages/inventory/warehouse/Warehouse";

// settings - system administration
import BusinessInfo from "../pages/settings/system-administration/business-info/BusinessInfo";
import UserManagement from "../pages/settings/system-administration/user-management/UserManagement";

// settings - system setting
// import UserManagement from "../pages/appSettings/UserManagement/UserManagement";

// Not Found
import NotFound from "../pages/NotFound";


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

          {/* INVENTORY */}
          <Route path="in/tables/warehouse-type" element={<WarehouseType />} />
          <Route path="in/tables/product-category" element={<ProductCategory />} />
          <Route path="in/warehouse" element={<Warehouse />} />

          {/* SETTINGS - SYSTEM ADMINISTRATION */}
          <Route path="se/adm/business-info" element={<BusinessInfo />} />
          {/* <Route path="se/sys/user-management" element={<UserManagement />} /> */}
          <Route path="se/adm/user-management" element={<UserManagement />} />
          
          <Route
            path="*"
            element={<NotFound />}
          />
          <Route
            path="/error"
            element={<NotFound />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}