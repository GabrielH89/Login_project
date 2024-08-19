import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";
import Modal from './Modal';
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const navigate = useNavigate();

    const doLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(email.trim().length > 0 && password.trim().length > 0) {
                const response = await axios.post("http://localhost:4100/signin", {
                    email: email,
                    password: password
                });

                const { token, user_id} = response.data;
                console.log(response.data);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user_id', user_id);

                navigate("/profile");
            }
        }catch(error) {
            if ((error as AxiosError).response && (error as AxiosError).response?.status === 404) {
                setErrorMessage("Email ou senha inválidos");
                setTimeout(() => {
                    setErrorMessage(""); 
                }, 5000);
            } else {
                console.log("Error: " + error);
            }
        }
    }

    return (
        <div>
            <form className="signInForm" onSubmit={doLogin}>
                {errorMessage && 
                    <div className="error-message" 
                    style={{ backgroundColor: '#B22222', color: 'white', padding: '10px', 
                    marginBottom: '10px', borderRadius: '5px', textAlign: 'center', fontSize: '1.1rem' }}>
                {errorMessage}</div>}
                <h2>Login</h2>
                <label>E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <button type="submit">Entrar</button>
                <p>Não possui uma conta? <Link to="#" onClick={() => setIsSignUpOpen(true)}>Cadastre-se</Link></p>
            </form>
            <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
                <SignUp />
            </Modal>
        </div>
    )
}

export default SignIn