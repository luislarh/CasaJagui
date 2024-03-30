import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/login/Registrar";
import Home from "./pages/home/Home"; // Dashboard del administrador
import Inicio from "./pages/index/Inicio"; // Página de inicio
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewEmpresa from "./pages/new/NewEmpresa";
import NewSlider from "./pages/new/NewSlider";
import NewMenu from "./pages/new/NewMenu";

import ListMenu from "./pages/list/ListMenu";
import ListCompany from "./pages/list/ListCompany";
import ListSlider from "./pages/list/ListSlider";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import { productInputs, userInputs, sliderInputs, menuInputs } from "./formSource";
import 'bootstrap/dist/css/bootstrap.min.css';




import "./style/dark.scss";
import MenuInicio from "./pages/menu/menu";
import Reserva from "./pages/reserva/reserva";
import Portal from "./pages/Restaurantes/portal500";
import Oficinas from "./pages/Restaurantes/oficninas";




function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => (
    currentUser ? children : <Navigate to="/login" />
  );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="login" element={<Login />} />
          <Route path="MenuInicio" element={<MenuInicio />} />
          <Route path="reserva" element={<Reserva />} />
          <Route path="Restaurantes" element={<Portal />} />
          <Route path="Oficinas" element={<Oficinas />} />
          <Route path="register" element={<Register />} />
          
          <Route
            path="admin"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="users">
            <Route
              index
              element={
                <RequireAuth>
                  <List />
                </RequireAuth>
              }
            />
            <Route
              path=":userId"
              element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              }
            />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <New inputs={userInputs} title="Add New User" />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="products">
            <Route
              index
              element={
                <RequireAuth>
                  <ListCompany />
                </RequireAuth>
              }
            />
            <Route
              path=":productId"
              element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              }
            />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <NewEmpresa inputs={productInputs} title="Add New Product" />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="sliders">
          <Route
            index
            element={
              <RequireAuth>
                <ListSlider />
              </RequireAuth>
            }
          />
          <Route
            path="new"
            element={
              <RequireAuth>
                <NewSlider inputs={sliderInputs} title="Add New Slider" />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="menu">
            <Route
              index
              element={
                <RequireAuth>
                  <ListMenu />
                </RequireAuth>
              }
            />
            <Route
              path=":menuId"
              element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              }
            />
            <Route
              path="new"
              element={
                <RequireAuth>
                  <NewMenu inputs={menuInputs} title="Add New Elemento" />
                </RequireAuth>
              }
            />
            <Route
            path="edit/:menuId"
            element={
              <RequireAuth>
                <NewMenu inputs={menuInputs} title="Edit Elemento" />
              </RequireAuth>
            }
          />

            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
