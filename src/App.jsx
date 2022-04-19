import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Formik } from "formik";

const firebaseConfig = {
  apiKey: "AIzaSyD-YW6A6yxKOCrVOuQHAxQTqiYPRLoyBHc",
  authDomain: "fir-9-demo-6f3eb.firebaseapp.com",
  projectId: "fir-9-demo-6f3eb",
  storageBucket: "fir-9-demo-6f3eb.appspot.com",
  messagingSenderId: "190489709643",
  appId: "1:190489709643:web:50d9ec68279542ab4a51ce",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "users");

// getDocs(colRef)
//   .then((snapshot) => {
//     console.log(snapshot.docs);

//     let users = [];
//     snapshot.docs.forEach((doc) => {
//       users.push({ ...doc.data(), id: doc.id });
//     });

//     console.log(users);
//   })
//   .catch((err) => console.log(err));

// Query
const q = query(colRef, where("name", "==", "Darwin"));

// Real time collection
onSnapshot(q, (snapshot) => {
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });

  console.log(users);
});

const Basic = () => (
  <div>
    <h1>Add User</h1>
    <Formik
      initialValues={{ email: "", name: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={({ email, name }, { setSubmitting }) => {
        setTimeout(() => {
          addDoc(colRef, {
            email,
            name,
          });
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <p>Name</p>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && errors.name}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

function App() {
  return (
    <>
      <h1>Hello, world</h1>
      <Basic />
    </>
  );
}

export default App;
