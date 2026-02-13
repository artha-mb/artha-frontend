import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatSystem from "./Components/ChatSystem";
import Form1 from "./Components/Form1";
import Form2 from "./Components/Form2";
import Form3 from "./Components/Form3";
import Form4 from "./Components/Form4";
import Instructions from "./Components/Instructions";
import CallSuccessForm from "./Components/CallSuccessForm";
import Header from "./Components/Navbar";
import ExamInstruction from "./Components/ExamInstruction";
import ExamResult from "./Components/ExamReport";
import Exam from "./Components/Exam";
import LoadingScreen from "./Components/LoadingScreen";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/chatsystem" element={<ChatSystem />} />
        <Route path="/form1" element={<Form1 />} />
        <Route path="/form2" element={<Form2 />} />
        <Route path="/form3" element={<Form3 />} />
        <Route path="/form4" element={<Form4 />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/callsuccessform" element={<CallSuccessForm />} />
        <Route path="/examinstruction" element={<ExamInstruction />} />
        <Route path="/examreport" element={<ExamResult />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/loading" element={<LoadingScreen />} />

      </Routes>
    </Router>
  );
}   
