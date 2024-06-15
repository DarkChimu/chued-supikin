import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/Default";
import Test from "./pages/Test";

function App() {
  return (
    <DefaultLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
}

export default App;
