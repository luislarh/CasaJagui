import { useContext, useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../../img/logoCasa.svg";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload:user });
      //   navigate("/");
      // })
      // .catch((error) => {
      //   setError(true);
      // });
      if (email === "casajagui@admin.com" && password === "admin123$") {
        // Redirige al dashboard del administrador
        navigate("/admin");
      } else {
        // Redirige a la página de inicio u otra página que no sea de administrador
        navigate("/");
      }
    })
    .catch((error) => {
      setError(true);
    });
  };

  return (
    <div className="login">
      <img src={logo} alt="Logo" className="login-logo" />
      <form onSubmit={handleLogin}>
        <h3>
          Inicia sesión<nav></nav>
        </h3>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassWord(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>¡Correo o contraseña incorrectos!</span>}
      </form>
      <p style={{ color: 'black' }}>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  );
};

export default Login;
