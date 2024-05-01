import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Dashboard, Home, Projects, SignIn, SignUp } from "./pages";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;