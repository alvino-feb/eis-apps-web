import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff
} from "lucide-react";

import {
    TextInput,
    Select,
    Checkbox,
} from "../../../../../components/ui";

import { useAuthStore } from "../../../../../store/authStore";

export default function UserTab({
    formik,
    businessMember,
    selectedRole
    // brandOptions = [],
    // unitOptions = [],
}) {

    const businessName = useAuthStore((state) => state.businessName);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="grid gap-5">

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Business
                </label>
                <TextInput
                    name="businessName"
                    value={businessName}
                    disabled

                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Business Member
                </label>
                <TextInput
                    name="businessMemberName"
                    value={businessMember.name}
                    disabled
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Role
                </label>
                <TextInput
                    name="selectedRole"
                    value={selectedRole}
                    disabled 
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Username
                </label>
                <TextInput
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // disabled={!!formik.values.username}
                    error={
                        formik.touched.username &&
                        formik.errors.username
                    }
                />
                {formik.touched.username &&
                formik.errors.username && (
                    <p className="mt-1 text-xs text-red-500">
                        {formik.errors.username}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Employee No
                </label>
                <TextInput
                    name="employeeNo"
                    disabled = {selectedRole === 'MEMBER_ADMINISTRATOR'}
                    value={formik.values.employeeNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.employeeNo &&
                        formik.errors.employeeNo
                    }
                />
                {formik.touched.employeeNo &&
                formik.errors.employeeNo && (
                    <p className="mt-1 text-xs text-red-500">
                        {formik.errors.employeeNo}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Employee Name
                </label>
                <TextInput
                    name="employeeName"
                    value={formik.values.employeeName}
                    disabled
                />
            </div>
            
            <div>
                <label className="mb-1 block text-sm font-medium">
                    Password
                </label>
                <TextInput
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.password &&
                        formik.errors.password
                    }
                />
                {formik.touched.password &&
                formik.errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                        {formik.errors.password}
                    </p>
                )}

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                {showPassword
                  ? <EyeOff size={18} />
                  : <Eye size={18} />}
              </button>
            </div>
            
            <div>
                <label className="mb-1 block text-sm font-medium">
                    Confirm Password
                </label>
                <TextInput
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                    }
                />
                <button
                    type="button"
                    onClick={() =>
                    setShowConfirmPassword(
                        !showConfirmPassword
                    )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {showConfirmPassword
                    ? <EyeOff size={18} />
                    : <Eye size={18} />}
                </button>

                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                        {formik.errors.confirmPassword}
                    </p>
                )}

            </div>

            <Checkbox
                label="Active"
                name="isActive"
                checked={formik.values.isActive}
                onChange={(e) =>
                    formik.setFieldValue(
                        "isActive",
                        e.target.checked
                    )
                }
            />
        </div>
    );

}
