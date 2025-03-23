import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { EnvContext } from "./EnvContext";

function App() {
  return (
    <EnvContext>
      <Router>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </EnvContext>
  );
}

export default App;
