    import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "../../components/ui";

export default function SampleForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name wajib diisi"),
      email: Yup.string().email("Format email salah").required("Email wajib"),
      age: Yup.number().required("Age wajib"),
    }),
    onSubmit: (values) => {
      console.log("SUBMIT:", values);
      alert("Data berhasil disubmit!");
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Sample Form</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <Input
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
        />

        <Input
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />

        <Input
          label="Age"
          name="age"
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.age && formik.errors.age}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}