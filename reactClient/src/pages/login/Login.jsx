import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { UserContext } from "../../contexts/UserContext";
import verzelLogo from "../../assets/logo2.jpg";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { user, token, auth, login } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const goToRegister = () => {
    navigate("/register");
  };

  const goToHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  useEffect(() => {
    if (token)
      setTimeout(() => {
        goToHome();
      }, 1500);
  }, [user, token, goToHome]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username || !password) {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return toast.warning("Preencha todos os campos");
      }

      const response = await axios.post(import.meta.env.VITE_APP_API_URL + "/auth/login", {
        username,
        password,
      });

      const { token } = response.data;
      auth(token);
      login({
        username,
      });

      toast.success("Usuário logado com sucesso");
      goToHome()
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(`Erro: ${error.response.data.message}`);
      } else {
        toast.error("Erro ao criar conta");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div>
        <img src={verzelLogo} className="logo2 mt-5 mb-4" alt="Verzel Movies logo" />
      </div>

      {user || token ? (
        <>
          <h1 className="read-the-docs mt-3 fs-3">
            Detectamos um usuário logado!
          </h1>
          <p className="text-bold">
            Redirecionando para seu painel de filmes..
          </p>
        </>
      ) : (
        <>
          <Form className="" onSubmit={handleSubmit}>
            <Form.Group
              className="mb-1 text-start"
              controlId="formBasicUsername"
            >
              <Form.Label className="fw-bold fs-3 mb-1">
                Nome de usuário
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="username"
                placeholder="Digite seu nome de usuário"
                onChange={(e)=> {setUsername(e.target.value)}}
                value={username}
              />
            </Form.Group>
            <Form.Group
              className="mb-4 text-start"
              controlId="formBasicPassword"
            >
              <Form.Label className="fw-bold fs-3 mb-1">Senha</Form.Label>
              <Form.Control
                className="mb-2"
                type="password"
                placeholder="Digite sua senha"
                onChange={(e)=> {setPassword(e.target.value)}}
                value={password}
              />
            </Form.Group>
            <Button
              variant="outline-light"
              className="entry"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {(user || token) ? 'Redirecionando': loading ? 'Validando..' : 'Entrar'}
            </Button>
          </Form>
          <Button onClick={goToRegister} variant="link" className="text-light mt-4">
            Não possui conta ainda?
          </Button>
        </>
      )}
    </div>
  );
}

export default Login;
