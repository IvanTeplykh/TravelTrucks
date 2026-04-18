"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./BookingForm.module.css";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Too short!"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

interface BookingFormProps {
  onSubmit?: (values: any) => void;
  isLoading?: boolean;
}

export default function BookingForm({ onSubmit, isLoading }: BookingFormProps) {
  const handleSubmit = (values: any, { resetForm }: any) => {
    if (onSubmit) {
      onSubmit(values);
      // Wait for success? Actually parent resets form after or we just reset
      resetForm();
    } else {
      toast.success("Booking request sent successfully!");
      resetForm();
    }
  };

  return (
    <div className={css.formContainer}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.fieldWrapper}>
            <Field name="name" placeholder="Name*" className={css.input} />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <Field name="email" placeholder="Email*" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <button type="submit" className={css.submitBtn} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
