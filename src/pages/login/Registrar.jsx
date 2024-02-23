import { useContext, useState } from "react";
import "./login.scss"; // Asegúrate de tener un archivo CSS para tu componente de registro
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Usuario registrado
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/"); // Navegar al inicio o a la página que prefieras después del registro
        })
        .catch((error) => {
        setError(true);
        });
    };

    return (
    <div className="login">
        <form onSubmit={handleRegister}>
        <h3>Regístrate</h3>
        <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <span>Hubo un error en el registro, intenta de nuevo.</span>}
        </form>
    </div>
    );
};

export default Register;
