import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

getDocs(colRef)
  .then((snapshot) => {
    console.log(snapshot.docs);

    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    console.log(users);
  })
  .catch((err) => console.log(err));

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello, world</h1>
    </>
  );
}

export default App;
