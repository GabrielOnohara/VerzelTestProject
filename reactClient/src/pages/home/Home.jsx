import {useContext} from 'react'

import {UserContext} from "../../contexts/UserContext";
const Home = () => {

  const { user, token } = useContext(UserContext);
  
  return (
    <div>
      Home
      <p>{token}</p>
      {user && (<p> {user.username} </p>) }
    </div>
  )
}

export default Home