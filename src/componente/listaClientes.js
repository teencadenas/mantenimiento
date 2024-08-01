import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nit_cliente: '', nombre_cliente: '', direccion_cliente: '', telefono_cliente: '', correo_cliente: '', contacto_cliente: '', ubicacion_cliente: '' });
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
          setForm({ nit_cliente: '', nombre_cliente: '', direccion_cliente: '', telefono_cliente: '', correo_cliente: '', contacto_cliente: '', ubicacion_cliente: '' });
        })
        .catch(error => {
          console.error('Error al actualizar el cliente:', error);
        });
    } else {
      axios.post('http:/localhost:3002/api/cliente', form)
        .then(() => {
          fetchClientes();
          setForm({ nit_cliente: '', nombre_cliente: '', direccion_cliente: '', telefono_cliente: '', correo_cliente: '', contacto_cliente: '', ubicacion_cliente: '' });
        })
        .catch(error => {
          console.error('Error al crear el cliente:', error);
        });
    }
  };

  const handleEdit = (cliente) => {
    setEditing(true);
    setCurrentId(cliente.nit_cliente);
    setForm({ nit_cliente: cliente.nombre_cliente, nombre_cliente: cliente.nombre_cliente, direccion_cliente: cliente.direccion_cliente, telefono_cliente: cliente.telefono_cliente, correo_cliente: cliente.correo_cliente, contacto_cliente: cliente.contacto_cliente, ubicacion_cliente: cliente.ubicacion_cliente });
  };

  const handleDelete = (nit_cliente) => {
    axios.delete(`http://localhost:3002/api/cliente/${nit_cliente}`)
      .then(() => {
        fetchClientes();
      })
      .catch(error => {
        console.error('Error al eliminar el cliente:', error);
      });
  };

  return (
    <div className='container'>
      <h1>Clientes</h1>
      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-3">
          <div class="form-floating mb-3">
            <input type="text" name="nit_cliente" class="form-control" id="floatingInput" value={form.nit_cliente} onChange={handleChange} placeholder="NIT" required />
            <label for="floatingInput">Nit cliente</label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-floating mb-3">
            <input type="text" name="nombre_cliente" class="form-control" id="floatingInput" value={form.nombre_cliente} onChange={handleChange} placeholder="Nombre" required />
            <label for="floatingInput">Nombre</label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-floating mb-3">
            <input type="text" name="direccion_cliente" class="form-control" id="floatingInput" value={form.direccion_cliente} onChange={handleChange} placeholder="Direccion" required />
            <label for="floatingInput">Direccion</label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-floating mb-3">
            <input type="text" name="telefono_cliente" class="form-control" id="floatingInput" value={form.telefono_cliente} onChange={handleChange} placeholder="Telefono" required />
            <label for="floatingInput">Telefono</label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-floating mb-3">
            <input type="email" name="correo_cliente" class="form-control" id="floatingInput" value={form.correo_cliente} onChange={handleChange} placeholder="Correo" required />
            <label for="floatingInput">Correo</label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-floating mb-3">
            <input type="text" name="contacto_cliente" class="form-control" id="floatingInput" value={form.contacto_cliente} onChange={handleChange} placeholder="Contacto" required />
            <label for="floatingInput">contacto</label>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-floating mb-3">
            <input type="text" name="ubicacion_cliente" class="form-control" id="floatingInput" value={form.ubicacion_cliente} onChange={handleChange} placeholder="ubicacion" required />
            <label for="floatingInput">ubicacion</label>
          </div>
        </div>
        <div class="col-3">
          <button type="submit" class="btn btn-outline-secondary btm-lg">{editing ? 'Actualizar' : 'Crear'}</button>
        </div>
      </form>
      {clientes.length > 0 ? (
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.nit_cliente}>
              {cliente.nit_cliente} - {cliente.nombre_cliente} -{cliente.direccion_cliente}-{cliente.telefono_cliente}-{cliente.correo_cliente}-{cliente.contacto_cliente}-{cliente.ubicacion_cliente}
              <button onClick={() => handleEdit(cliente)}>Editar</button>
              <button onClick={() => handleDelete(cliente.nit_cliente)}>Eliminar</button>
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

