import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const NewMenu = ({ inputs, title, initialData }) => {
    const location = useLocation();
    const { menuId } = useParams();
    const [data, setData] = useState(location.state?.initialData || {});;
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
      if (initialData) {
        setData(initialData);
        setSelectedCategory(initialData.category);
        setEditingId(initialData.id);
      }
    }, [initialData]);

    const handleInput = (e) => {
      const id = e.target.id;
      const value = e.target.value;
      setData({ ...data, [id]: value });
    };

    const handleAddOrUpdate = async (e) => {
      e.preventDefault();
      try {
        if (editingId) {
          // Si hay un ID de edición, actualiza el documento existente
          await updateDoc(doc(db, "menu", menuId), {
            ...data,
            category: selectedCategory,
            timeStamp: serverTimestamp(),
          });
          setAlertMessage("Elemento actualizado exitosamente");
        } else {
          // Si no hay un ID de edición, agrega un nuevo documento
          await addDoc(collection(db, "menu"), {
            ...data,
            category: selectedCategory,
            timeStamp: serverTimestamp(),
          });
          setAlertMessage("Elemento creado exitosamente");
        }
        setShowAlert(true);
        setAlertType("success");
      } catch (err) {
        console.error(err.message);
        setShowAlert(true);
        setAlertType("error");
        setAlertMessage("Error al guardar el elemento: " + err.message);
      }
    };

    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };

    const handleCloseAlert = () => {
      setShowAlert(false);
    };

    return (
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="fileUploadContainer">
            {showAlert && (
              <Alert severity={alertType} onClose={handleCloseAlert}>
                {alertMessage}
              </Alert>
            )}
            <form onSubmit={handleAddOrUpdate}>
              {/* Componente Select para la categoría */}
              <div className="formInput" key="categoria">
                <label>Categoría</label>
                <FormControl fullWidth>
                  <InputLabel id="categoria-label">Selecciona la categoría</InputLabel>
                  <Select
                    labelId="categoria-label"
                    id="categoria"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="">Seleccione una categoría</MenuItem>
                    <MenuItem value="Crepas y waffles">Crepas y waffles</MenuItem>
                    <MenuItem value="Bebidas">Bebidas</MenuItem>
                    <MenuItem value="Comida">Comida</MenuItem>
                    <MenuItem value="Almuerzos">Almuerzos</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* Demás campos de entrada */}
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={data[input.id] || ""}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default NewMenu;
