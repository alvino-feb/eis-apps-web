import { useFormik } from "formik";
import * as Yup from "yup";

import {
    Modal,
    Button,
} from "../../../../components/ui";

export default function ReferenceModal({
    open,
    onClose,

    title,

    businessName,
    businessMemberName,

    editingData,
    saving,

    onSubmit,
}) {

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            code:
                editingData?.code ?? "",

            name:
                editingData?.name ?? "",

            description:
                editingData?.description ?? "",

            isActive:
                editingData?.isActive ??
                true,
        },

        validationSchema: Yup.object({

            code:
                Yup.string()
                    .required(
                        "Code is required"
                    ),

            name:
                Yup.string()
                    .required(
                        "Name is required"
                    ),

            description:
                Yup.string(),

        }),

        onSubmit: async (values) => {

            await onSubmit(values);

        },

    });

    const handleClose = () => {

        formik.resetForm();

        onClose?.();

    };

    return (
        <Modal

            open={open}

            onClose={handleClose}

            loading={saving}

            title={
                editingData
                    ? `Edit ${title}`
                    : `Add ${title}`
            }

        >

            <form
                onSubmit={
                    formik.handleSubmit
                }
            >

                <div className="grid gap-4">

                    {/* BUSINESS */}

                    <div>

                        <label
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Business
                        </label>

                        <input
                            value={
                                businessName
                            }
                            readOnly
                            className="
                                mt-1
                                w-full
                                border
                                rounded-md
                                px-3
                                py-2
                                bg-gray-100
                            "
                        />

                    </div>


                    {/* BUSINESS MEMBER */}

                    <div>

                        <label
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Business Member
                        </label>

                        <input
                            value={
                                businessMemberName
                            }
                            readOnly
                            className="
                                mt-1
                                w-full
                                border
                                rounded-md
                                px-3
                                py-2
                                bg-gray-100
                            "
                        />

                    </div>


                    {/* CODE */}

                    <div>

                        <label
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Code
                        </label>

                        <input
                            name="code"

                            value={
                                formik
                                    .values
                                    .code
                            }

                            onChange={
                                formik.handleChange
                            }

                            onBlur={
                                formik.handleBlur
                            }

                            readOnly={
                                !!editingData
                            }

                            className={`
                                mt-1
                                w-full
                                border
                                rounded-md
                                px-3
                                py-2

                                ${
                                    editingData
                                        ? "bg-gray-100"
                                        : ""
                                }
                            `}
                        />

                        {
                            formik.touched.code &&
                            formik.errors.code && (

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-red-500
                                    "
                                >
                                    {
                                        formik
                                            .errors
                                            .code
                                    }
                                </p>

                            )
                        }

                    </div>


                    {/* NAME */}

                    <div>

                        <label
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Name
                        </label>

                        <input
                            name="name"

                            value={
                                formik
                                    .values
                                    .name
                            }

                            onChange={
                                formik.handleChange
                            }

                            onBlur={
                                formik.handleBlur
                            }

                            className="
                                mt-1
                                w-full
                                border
                                rounded-md
                                px-3
                                py-2
                            "
                        />

                        {
                            formik.touched.name &&
                            formik.errors.name && (

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-red-500
                                    "
                                >
                                    {
                                        formik
                                            .errors
                                            .name
                                    }
                                </p>

                            )
                        }

                    </div>


                    {/* DESCRIPTION */}

                    <div>

                        <label
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            Description
                        </label>

                        <textarea
                            name="description"

                            rows={3}

                            value={
                                formik
                                    .values
                                    .description
                            }

                            onChange={
                                formik.handleChange
                            }

                            onBlur={
                                formik.handleBlur
                            }

                            className="
                                mt-1
                                w-full
                                border
                                rounded-md
                                px-3
                                py-2
                            "
                        />

                    </div>


                    {/* ACTIVE */}

                    <label
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <input
                            type="checkbox"
                            name="isActive"

                            checked={
                                formik
                                    .values
                                    .isActive
                            }

                            onChange={
                                formik.handleChange
                            }
                        />

                        Active

                    </label>


                    {/* FOOTER */}

                    <div
                        className="
                            flex
                            justify-end
                            gap-2
                            mt-6
                            pt-4
                            border-t
                        "
                    >

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={
                                handleClose
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={saving}
                        >
                            {
                                saving
                                    ? "Saving..."
                                    : editingData
                                        ? "Update"
                                        : "Save"
                            }
                        </Button>

                    </div>

                </div>

            </form>

        </Modal>
    );
}