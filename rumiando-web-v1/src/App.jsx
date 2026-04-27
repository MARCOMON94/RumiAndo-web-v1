import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AnimalsPage from "./pages/AnimalsPage";
import ContactPage from "./pages/ContactPage";
import AnimalDetailPage from "./pages/AnimalDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/censo" element={<AnimalsPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/animal/:id" element={<AnimalDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;