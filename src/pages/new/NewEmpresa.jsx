import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const NewEmpresa = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const navigate = useNavigate();

  const handleAdditionalFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalFiles((prevState) => [...prevState, ...files]);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  // Función reutilizable para la carga de archivos
  const uploadFileAndGetURL = async (file) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Aquí podrías manejar la barra de progreso si es necesario
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // Efecto para cargar el logotipo
  useEffect(() => {
    if (!file) return;

    uploadFileAndGetURL(file).then((downloadURL) => {
      setData((prev) => ({ ...prev, img: downloadURL }));
    }).catch((error) => console.log(error));
  }, [file]);

  // Efecto para cargar imágenes adicionales
  useEffect(() => {
    if (additionalFiles.length === 0) return;

    const uploadPromises = Array.from(additionalFiles).map(file =>
      uploadFileAndGetURL(file)
    );

    Promise.all(uploadPromises)
      .then(urls => {
        setData(prev => ({
          ...prev,
          additionalImages: urls,
        }));
      })
      .catch(error => console.log(error));
  }, [additionalFiles]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "companies"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setShowAlert(true);
      setAlertType("success");
      setAlertMessage("Empresa creada exitosamente");
      // Opcional: navegar a otra página o resetear el formulario aquí
    } catch (err) {
      console.error(err.message);
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage("Error al crear la empresa: " + err.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            {showAlert && (
              <Alert severity={alertType} onClose={() => setShowAlert(false)}>
                <AlertTitle>{alertType === "success" ? "Éxito" : "Error"}</AlertTitle>
                {alertMessage}
              </Alert>
            )}
            <div className="fileUploadContainer">
              <form onSubmit={handleAdd}>
                <div className="formInput">
                  <label htmlFor="file">
                    Logotipo: <DriveFolderUploadOutlinedIcon className="icon" />
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <div className="formInput">
                  <label htmlFor="additionalFiles">
                    Imágenes Adicionales: <DriveFolderUploadOutlinedIcon className="icon" />
                    <input
                      type="file"
                      id="additionalFiles"
                      multiple
                      onChange={handleAdditionalFilesChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  </div>
                ))}
                <button type="submit">Enviar</button>
              </form>
              <div className="additionalImagesPreview">
                {additionalFiles.map((file, index) => (
                  <div className="cellWithImg" key={index}>
                    <img src={URL.createObjectURL(file)} alt={`Image ${index}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmpresa;
