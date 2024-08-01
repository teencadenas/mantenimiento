import React from 'react';
import Clientes from './componente/listaClientes'
import Personas from './componente/listaPersona'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React App app.js</h1>
        <Clientes/>
      </header>
    </div>
  );
}

export default App;
