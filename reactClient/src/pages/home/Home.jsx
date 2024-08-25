import { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import verzelLogo from "../../assets/logo2.jpg";

const Home = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const { user, token, tokenWasValidated } = useContext(UserContext);

  if(!tokenWasValidated)
    return <>
      <div>
        <img src={verzelLogo} className="logo2 my-4" alt="Verzel Movies logo" />
      </div>
      <h1>Validando token..</h1>
    </>

  if(!token)
    return <>
        <>
        <img src={verzelLogo} className="logo2 my-4" alt="Verzel Movies logo" />
          <h1>Token expirado</h1>
          <p>Necesário validar novamente na tela de login</p>
          <Button className="mt-3" variant="outline-light" onClick={goToLogin}>Voltar para o login</Button>
       </>
    </>

  return (
    <>
      <div className="container-sm">
        <h1>Home</h1>
        <p className="text-break mx-auto" style={{width: '50%'}}>{token}</p>
        {user && <p> {user.username} </p>}
      </div>
    </>
  );
};

export default Home;
