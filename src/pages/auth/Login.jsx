import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppStore } from "../../store/appStore";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

import { Input, Button } from "../../components/ui";
import { login } from "../../services/auth";

export default function Login() {

  const navigate = useNavigate();

  const { loading, setLoading } =
    useAppStore();

  const { setAuth, setBusinessMember } =
    useAuthStore();

  const [errorMsg, setErrorMsg] =
    useState("");

  const formik = useFormik({

    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({

      username: Yup.string()
        .required("Username wajib diisi"),

      password: Yup.string()
        .required("Password wajib diisi"),

    }),

    onSubmit: async (values) => {

      try {

        setLoading(true);
        setErrorMsg("");

        const result =
          await login(values);

        const data =
          result.data;
        
        setAuth({
          userId: data.userId,
          username: data.username,
          businessId: data.businessId,
          businessMembers:  data.businessMembers,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        if ( data.businessMembers?.length === 1 ) 
        {

          setBusinessMember(
            data.businessMembers[0]
          );

          navigate("/");

        } else {

          navigate(
            "/select-member"
          );

        }

      } catch (err) {

        setErrorMsg(

          err?.response?.data?.message ||

          "Login failed"

        );

      } finally {

        setLoading(false);

      }

    },

  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-80 border"
      >

        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          Log In
        </h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-600 text-sm p-2 mb-4 rounded">
            {errorMsg}
          </div>
        )}

        <Input
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.username &&
            formik.errors.username
          }
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password &&
            formik.errors.password
          }
        />

        <div className="flex justify-end mt-4">

          <Button
            type="submit"
            disabled={loading}
          >

            {
              loading
                ? "Loading..."
                : "Login"
            }

          </Button>

        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          © 2026 Enterprise Integrated System
        </p>

      </form>

    </div>
  );

}