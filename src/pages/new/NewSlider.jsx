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

const NewSlider = ({ inputs, title }) => {
const [file, setFile] = useState("");
const [data, setData] = useState({});
const navigate = useNavigate();

const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
};

const [showAlert, setShowAlert] = useState(false);
const [alertType, setAlertType] = useState("success");
const [alertMessage, setAlertMessage] = useState("");

const uploadFileAndGetURL = async (file) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
        'state_changed',
        (snapshot) => {},
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

useEffect(() => {
    if (!file) return;

    uploadFileAndGetURL(file).then((downloadURL) => {
    setData((prev) => ({ ...prev, img: downloadURL }));
    }).catch((error) => console.log(error));
}, [file]);

const handleAdd = async (e) => {
    e.preventDefault();
    try {
        await addDoc(collection(db, "sliders"), {
        ...data,
        timeStamp: serverTimestamp(),
        });
        setShowAlert(true);
        setAlertType("success");
        setAlertMessage("Slider creado exitosamente");
      // Opcional: navegar a otra página o resetear el formulario aquí
    } catch (err) {
        console.error(err.message);
        setShowAlert(true);
        setAlertType("error");
        setAlertMessage("Error al crear el slider: " + err.message);
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
                    Imagen del Slider: <DriveFolderUploadOutlinedIcon className="icon" />
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
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
            </div>
            </div>
        </div>
        </div>
    </div>
    );
};

export default NewSlider;
