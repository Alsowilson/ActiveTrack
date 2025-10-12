import React from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <div>
      <Header />
      <main className="p-6">
        {/* 👇 Uncomment only one at a time to preview */}
        {/* <LoginForm /> */}
        <SignupForm />
        {/* <Dashboard /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;

