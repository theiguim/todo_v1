import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredencials } from "../slicers/authSlice";

const OAuth = () => {

    const dispatch = useDispatch();

    const [oauth, setOauth] = useState("");
    const [message, setMessage] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function pickName(e) {
        setName(e.target.value);
    };
    function pickEmail(e) {
        setEmail(e.target.value);
    };
    function pickPassword(e) {
        setPassword(e.target.value);
    };

    function register(e) {
        e.preventDefault()
        if (name && email && password) {

            fetch("http://localhost:3000/oauth/register", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ name, email, password })
            }).then(res => res.json())
                .then(data => {   //preciso imprimir na tela cadastrado
                    setName("");
                    setEmail("");
                    setPassword("");
                    setMessage("Registrado com Sucesso");
                    setTimeout(() => {
                        setMessage("");
                        setOauth("login");
                    }, 1000)
                })
                .catch(err => console.log(err));
        } else {
            setMessage("Preencha todos os campos!");
            setTimeout(() => setMessage(""), 1000)
        }
    };

    async function login(e) {
        e.preventDefault();

        if (email && password) {

            await fetch("http://localhost:3000/oauth/login/", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email, password }),
            }).then(res => {
                if (res.status === 401) {
                    setMessage("Credenciais inválidas");
                } else {
                    const token = res.headers.get("Token-Auth");
                    if (token) {
                        localStorage.setItem("token", token);
                        setMessage("Logado com sucesso!");
                        dispatch(setCredencials({ token }));
                    }
                    res.json();
                };
            })
                .then(data => {
                    setEmail("");
                    setPassword("");
                    setTimeout(() => setMessage(""), 1000)
                }).catch(err => {
                    console.log(err);
                    setMessage("Houve um problema ao cadastrar");
                    setTimeout(() => setMessage(""), 1000);
                })
        } else {
            setMessage("Preencha todos os campos!");
            setTimeout(() => setMessage(""), 1000);
        }
    }
    return (
        <div className="oauthContainer">
            {oauth === "register" ? <form action="">
                <p>User: <input className="input" type="text" placeholder="Username" onChange={pickName} value={name} required maxLength={100}/></p>
                <p>E-mail: <input className="input" type="email" placeholder="E-mail" onChange={pickEmail} value={email} required maxLength={200}/></p>
                <p>Senha:   <input className="input" type="password" placeholder="Password" onChange={pickPassword} value={password} required maxLength={200}/></p>
                <button className="btn" onClick={register}>Registrar</button>
            </form>
                :
                <form action="">
                    <p>E-mail: <input className="input" type="email" placeholder="E-mail" onChange={pickEmail} value={email} required maxLength={200}/></p>
                    <p>Senha:   <input className="input" type="password" placeholder="Password" onChange={pickPassword} value={password} required maxLength={200}/></p>
                    <button className="btn" onClick={login}>Login</button>
                </form>
            }
            {message ? <p className="message_sucess"> {message}</p> : ""}
            <div className="btn_oauth">
                <button className="btn" id="login" onClick={() => { setOauth("login") }}>Loggin</button>
                <button className="btn" id="register" onClick={() => { setOauth("register") }}>Register</button>
            </div>
        </div>
    );
};
export default OAuth;
