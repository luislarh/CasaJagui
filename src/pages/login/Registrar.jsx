import { useContext, useState } from "react";
import "./login.css"; // Asegúrate de tener un archivo CSS para tu componente de registro
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../../img/logoCasa.svg";

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
        <img src={logo} alt="Logo" className="login-logo" />
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
        <button type="submit">Registrarse</button>
        {error && <span>Hubo un error en el registro, intenta de nuevo.</span>}
        </form>
        <p style={{ color: 'black' }}>¿Tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
    );
};

export default Register;
