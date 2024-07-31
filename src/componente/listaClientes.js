import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nit_cliente: '', nombre_cliente: '', direccion_cliente:'', telefono_cliente:'', correo_cliente: '',contacto_cliente:'',ubicacion_cliente:'' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    axios.get('http://localhost:3002/api/cliente')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error al realizar la consulta:', error);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      axios.put(`http://localhost:3002/api/cliente/${currentId}`, form)
        .then(() => {
          fetchClientes();
          setEditing(false);
          setForm({ nit_cliente: '', nombre_cliente: '', direccion_cliente:'', telefono_cliente:'', correo_cliente: '',contacto_cliente:'',ubicacion_cliente:''  });
        })
        .catch(error => {
          console.error('Error al actualizar el cliente:', error);
        });
    } else {
      axios.post('http://localhost:3002/api/cliente', form)
        .then(() => {
          fetchClientes();
          setForm({ nit_cliente: '', nombre_cliente: '', direccion_cliente:'', telefono_cliente:'', correo_cliente: '',contacto_cliente:'',ubicacion_cliente:''});
        })
        .catch(error => {
          console.error('Error al crear el cliente:', error);
        });
    }
  };

  const handleEdit = (cliente) => {
    setEditing(true);
    setCurrentId(cliente.id);
    setForm({ nit_cliente: cliente.nombre_cliente, nombre_cliente: cliente.nombre_cliente, direccion_cliente:cliente.direccion_cliente, telefono_cliente: cliente.telefono_cliente, correo_cliente: cliente.correo_cliente,contacto_cliente: cliente.contacto_cliente, ubicacion_cliente: cliente.ubicacion_cliente });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/api/cliente/${id}`)
      .then(() => {
        fetchClientes();
      })
      .catch(error => {
        console.error('Error al eliminar el cliente:', error);
      });
  };

  return (
    <div>
      <h1>Clientes</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nit_cliente" value={form.nit_cliente} onChange={handleChange} placeholder="NIT" required />
        <input type="text" name="nombre_cliente" value={form.nombre_cliente} onChange={handleChange} placeholder="Nombre" required />
        <input type="text" name="direccion_cliente" value={form.correo_cliente} onChange={handleChange} placeholder="Direccion" required />
        <input type="text" name="telefono_cliente" value={form.nit_cliente} onChange={handleChange} placeholder="Telefono" required />
        <input type="email" name="correo_cliente" value={form.nit_cliente} onChange={handleChange} placeholder="Correo" required />
        <input type="text" name="contacto_cliente" value={form.nit_cliente} onChange={handleChange} placeholder="Contacto" required />
        <input type="text" name="ubicacion_cliente" value={form.nit_cliente} onChange={handleChange} placeholder="ubicacion" required />
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
      </form>
      {clientes.length > 0 ? (
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.id}>
              {cliente.nit_cliente} - {cliente.nombre_cliente} -{cliente.direccion_cliente}-{cliente.telefono_cliente}-{cliente.correo_cliente}-{cliente.contacto_cliente}-{cliente.ubicacion_cliente}
              <button onClick={() => handleEdit(cliente)}>Editar</button>
              <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default App;

