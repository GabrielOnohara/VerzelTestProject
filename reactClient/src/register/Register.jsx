import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import verzelLogo from "../assets/logo2.jpg";
import "./Register.css";


function Register() {
    return (
        <div className='login'>
            <div>
                <img src={verzelLogo} className="logo2 my-4" alt="Verzel Movies logo" />
            </div>

            <Form className='my-4'>
                <Form.Group className="mb-1 text-start" controlId="formBasicUsername">
                    <Form.Label className='fw-bold fs-3 mb-1'>Nome de usuário</Form.Label>
                    <Form.Control className="mb-3" type="username" placeholder="Digite seu nome de usuário" />
                </Form.Group>
                <Form.Group className="mb-1 text-start" controlId="formBasicEmail">
                    <Form.Label className='fw-bold fs-3 mb-1'>Email</Form.Label>
                    <Form.Control className="mb-3" type="email" placeholder="Digite seu nome de usuário" />
                </Form.Group>
                <Form.Group className="mb-4 text-start" controlId="formBasicPassword">
                    <Form.Label className='fw-bold fs-3 mb-1'>Senha</Form.Label>
                    <Form.Control className="mb-3" type="password" placeholder="Digite sua senha" />
                </Form.Group>
                <Button variant="outline-light" className='mt-1 mb-5 entry' size='lg' type="submit">
                    Criar Conta
                </Button>
            </Form>
        </div>
        
    )
}

export default Register