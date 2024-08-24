import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useCallback } from "react";

import {UserContext} from "../../contexts/UserContext";
import verzelLogo from "../../assets/logo2.jpg";
import "./Login.css";

function Login() {
    const navigate = useNavigate()
    const { user, token } = useContext(UserContext);

    const goToRegister = () => {
        navigate('/register')
    }

    const goToHome = useCallback(() => {
        navigate('/home')
    },[ navigate ])

    useEffect(() => {
        if(token)
        setTimeout(() => {
            goToHome()
        }, 1500)
    },[user, token, goToHome])

    return (
        <div className='login'>
            <div>
                <img src={verzelLogo} className="logo2 mb-4" alt="Verzel Movies logo" />
            </div>

            {
                (user || token) ?
                    <>
                        <h1 className="read-the-docs my-3 fs-3">
                            Detectamos um usuário logado! 
                        </h1>
                        <p className='text-bold'>Redirecionando para seu painel de filmes..</p>
                    </>
                :
                <>
                    <Form className='my-4'>
                        <Form.Group className="mb-1 text-start" controlId="formBasicUsername">
                            <Form.Label className='fw-bold fs-3 mb-1'>Nome de usuário</Form.Label>
                            <Form.Control className="mb-3" type="username" placeholder="Digite seu nome de usuário" />
                        </Form.Group>
                        <Form.Group className="mb-4 text-start" controlId="formBasicPassword">
                            <Form.Label className='fw-bold fs-3 mb-1'>Senha</Form.Label>
                            <Form.Control className="mb-3" type="password" placeholder="Digite sua senha" />
                        </Form.Group>
                        <Button variant="outline-light" className='mt-1 mb-5 entry' size='lg' type="submit">
                            Entrar
                        </Button>
                    </Form>
                    <Button onClick={goToRegister} variant='link' className='text-light'>
                        Não possui conta ainda?
                    </Button>
                </>
            }
        </div>
    )
}

export default Login