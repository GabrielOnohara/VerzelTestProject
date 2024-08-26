import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import verzelLogo from "../../assets/logo2.jpg";
import "./Register.css";
import { UserContext } from "../../contexts/UserContext";

function Register() {
  const navigate = useNavigate();

  const { user, token, auth, login } = useContext(UserContext);

  const goToHome = useCallback(() => {
    navigate('/home')
  },[ navigate ])

  useEffect(() => {
    if (user || token)
        setTimeout(() => {
          goToHome()
        }, 1000)
  }, [user, token, goToHome]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username || !email || !password) {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return toast.warning("Preencha todos os campos");
      }

      const response = await axios.post(import.meta.env.VITE_APP_API_URL + "/auth/register", {
        username,
        email,
        password,
      });

      const { token } = response.data;
      auth(token);
      login({
        username,
        email,
      });

      toast.success("Usuário criado com sucesso");
      setTimeout(() => {
        goToHome()
      }, 1000);
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
        <img src={verzelLogo} className="logo2 my-4" alt="Verzel Movies logo" />
      </div>

      <Form className="my-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-1 text-start" controlId="formBasicUsername">
          <Form.Label className="fw-bold fs-3 mb-1">Nome de usuário</Form.Label>
          <Form.Control
            className="mb-3"
            type="username"
            placeholder="Digite seu nome de usuário"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Form.Group>
        <Form.Group className="mb-1 text-start" controlId="formBasicEmail">
          <Form.Label className="fw-bold fs-3 mb-1">Email</Form.Label>
          <Form.Control
            className="mb-3"
            type="email"
            placeholder="Digite um email válido"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-4 text-start" controlId="formBasicPassword">
          <Form.Label className="fw-bold fs-3 mb-1">Senha</Form.Label>
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Button
          variant="outline-light"
          className="mt-1 mb-5 entry"
          size="lg"
          type="submit"
          disabled={loading}
        >
          {user || token
            ? "Redirecionando.."
            : loading
            ? "Carregando.."
            : "Criar Conta"}
        </Button>
      </Form>
    </div>
  );
}

export default Register;
