import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatSystem from "./Components/ChatSystem";
import Form1 from "./Components/Form1";
import Form2 from "./Components/Form2";
import Form3 from "./Components/Form3";
import Form4 from "./Components/Form4";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatSystem />} />
        <Route path="/form1" element={<Form1 />} />
        <Route path="/form2" element={<Form2 />} />
        <Route path="/form3" element={<Form3 />} />
        <Route path="/form4" element={<Form4 />} />
      </Routes>
    </Router>
  );
}
