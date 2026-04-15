"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./BookingForm.module.css";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Too short!"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bookingDate: Yup.date().required("Date is required"),
  comment: Yup.string(),
});

export default function BookingForm() {
  const handleSubmit = (values: any, { resetForm }: any) => {
    toast.success("Booking request sent successfully!");
    resetForm();
  };

  return (
    <div className={css.formContainer}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{ name: "", email: "", bookingDate: "", comment: "" }}
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

          <div className={css.fieldWrapper}>
            <Field name="bookingDate" type="date" placeholder="Booking date*" className={css.input} />
            <ErrorMessage name="bookingDate" component="div" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <Field as="textarea" name="comment" placeholder="Comment" className={css.textarea} />
          </div>

          <button type="submit" className={css.submitBtn}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
}
