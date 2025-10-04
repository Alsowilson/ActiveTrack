import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx";

function App() {
  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to ActiveTrack</h1>
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;

