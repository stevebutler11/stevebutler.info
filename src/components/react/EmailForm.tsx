import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Formik, Field, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./EmailForm.module.css";

type EmailFormProps = {};

interface Values {
  name: string;
  email: string;
  message: string;
}

const EmailForm = (props: EmailFormProps) => {
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const showSnackbar = (msg: string) => {
    setSnackbarMessage(msg);
    setTimeout(() => {
      setSnackbarMessage(null);
    }, 2500);
  };

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string()
      .min(2, "Too Short!")
      .max(5000, "Too Long!")
      .required("Message is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}
        validationSchema={ContactSchema}
        onSubmit={async (
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          if (values.name.length >= 2 && values.message.length >= 2) {
            try {
              await emailjs.send(
                "service_48hinz7",
                "template_55x271t",
                {
                  from_name: values.name,
                  message: values.message,
                  sender_email: values.email,
                },
                "qDMx5r6pgNYwSVelc"
              );
              showSnackbar("Message sent");
              resetForm();
            } catch (err) {
              showSnackbar("There was an error");
            }
          } else {
            showSnackbar("Don't be tight! put your details in");
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>
            <p>Email: contact @ thiswebsitedomain</p>
            <p>Or leave me a message:</p>
            <div className={styles.topRow}>
              <div className={styles.fieldErrorCombo}>
                <Field
                  className={styles.formInputs}
                  id="name"
                  name="name"
                  placeholder="name"
                  disabled={isSubmitting}
                />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
              </div>

              <div className={styles.fieldErrorCombo}>
                <Field
                  className={styles.formInputs}
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  disabled={isSubmitting}
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className={styles.fieldErrorCombo}>
              <Field
                className={styles.formInputs}
                as="textarea"
                id="message"
                name="message"
                placeholder="message"
                disabled={isSubmitting}
              />
              {errors.message && touched.message ? (
                <div>{errors.message}</div>
              ) : null}
            </div>

            <button className={styles.sendButton} type="submit">
              {!isSubmitting ? (
                "Submit"
              ) : (
                <svg
                  className={styles.spinner}
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                    stroke="white"
                  />
                </svg>
              )}
            </button>
          </Form>
        )}
      </Formik>
      {snackbarMessage && (
        <div className={styles.snackbar}>
          {snackbarMessage}
          <svg
            fill="currentColor"
            height="12px"
            width="12px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 460.775 460.775"
            onClick={() => setSnackbarMessage(null)}
          >
            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
          </svg>
        </div>
      )}
    </>
  );
};

export default EmailForm;
