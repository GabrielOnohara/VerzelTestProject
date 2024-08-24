import { useState } from 'react'

import verzelLogo from './assets/logo2.jpg'
import './App.css'
import Button from 'react-bootstrap/Button';

function App() {

  return (
    <>
      <div>
        <img src={verzelLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>Verzel Movies</h1>
      <div className="card">
        <Button variant='dark' onClick={() => {console.log('clicou em acessar');
        }}>
           Acessar
        </Button>
      </div>
      <p className="read-the-docs">
        Clique em acessar para iniciar sua jornada no mundo dos filmes
      </p>
    </>
  )
}

export default App
