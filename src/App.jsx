import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, ProductsDetail, Login, Purchases } from "./pages";
import { Loading, NavBar, ProtectedRoutes } from "./components";
import { useSelector } from "react-redux/es/exports";
import Footer from "./components/Footer";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  document.body.style.backgroundColor = "#eee";

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
