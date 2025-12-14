import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import One from "./pages/One";
import Two from "./pages/Two";
import Three from "./pages/Three";
import Four from "./pages/Four";
import Five from "./pages/Five";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<One />} />
        <Route path="/two" element={<Two />} />
        <Route path="/three" element={<Three />} />
        <Route path="/four" element={<Four />} />
        <Route path="/five" element={<Five />} />
      </Routes>
    </>
  );
}
