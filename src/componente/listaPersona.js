import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [personas, setPersonas] = useState([]);
  const [form, setForm] = useState({ id_persona:'', nombre_persona:'', apellido_persona:'', fecha_nacimiento_persona:'', edad_persona :'',genero_persona:'', direccion_persona:'', telefono_persona:'', correo_persona:'' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = () => {
    axios.get('http://localhost:3002/api/persona')
      .then(response => {
        setPersonas(response.data);
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
      axios.put(`http://localhost:3002/api/persona/${currentId}`, form)
        .then(() => {
          fetchPersonas();
          setEditing(false);
          setForm({ id_persona:'', nombre_persona:'', apellido_persona:'', fecha_nacimiento_persona:'', edad_persona :'',genero_persona:'', direccion_persona:'', telefono_persona:'', correo_persona:'' });
        })
        .catch(error => {
          console.error('Error al actualizar el persona:', error);
        });
    } else {
      axios.post('http://localhost:3002/api/persona', form)
        .then(() => {
          fetchPersonas();
          setForm({ id_persona:'', nombre_persona:'', apellido_persona:'', fecha_nacimiento_persona:'', edad_persona :'',genero_persona:'', direccion_persona:'', telefono_persona:'', correo_persona:'' });
        })
        .catch(error => {
          console.error('Error al crear el persona:', error);
        });
    }
  };

  const handleEdit = (persona) => {
    setEditing(true);
    setCurrentId(persona.id_persona);
    setForm({ id_persona:persona.id_persona, nombre_persona:persona.nombre_persona, apellido_persona:persona.apellido_persona, fecha_nacimiento_persona:persona.fecha_nacimiento_persona, edad_persona :persona.edad_persona,genero_persona:persona.genero_persona, direccion_persona:persona.direccion_persona, telefono_persona:persona.telefono_persona, correo_persona:persona.correo_persona });
  };

  const handleDelete = (id_persona) => {
    axios.delete(`http://localhost:3002/api/persona/${id_persona}`)
      .then(() => {
        fetchPersonas();
      })
      .catch(error => {
        console.error('Error al eliminar el persona:', error);
      });
  };

  return (
    <div className='container'>
      <h1 className='my-4'>Persona</h1>
      <form onSubmit={handleSubmit} className='mb-4'>
        <div className='form-group'>
            <input type="text" name="id_persona" value={form.id_persona} onChange={handleChange} className="form-control" placeholder="ID" required />
            <input type="text" name="nombre_persona" value={form.nombre_persona} onChange={handleChange} className="form-control" placeholder="Nombre" required />
            <input type="text" name="apellido_persona" value={form.apellido_persona} onChange={handleChange} className="form-control" placeholder="Apellido" required />
        </div>
        <div>
            <label>Fecha nacimiento</label>
            <input type="date" name="fecha_nacimiento_persona" value={form.fecha_nacimiento_persona} onChange={handleChange} className="form-control" placeholder="Nacimiento" required />
            <input type="text" name="edad_persona" value={form.edad_persona} onChange={handleChange} className="form-control" placeholder="Edad" required />
        </div>
        <div>    
            <input type="text" name="genero_persona" value={form.genero_persona} onChange={handleChange} className="form-control" placeholder="Genero" required />
            <input type="text" name="direccion_persona" value={form.direccion_persona} onChange={handleChange} className="form-control" placeholder="Direccion" required />
            <input type="text" name="telefono_persona" value={form.telefono_persona} onChange={handleChange} className="form-control" placeholder="Telefono" required />
            <input type="email" name="correo_persona" value={form.correo_persona} onChange={handleChange} className="form-control" placeholder="Correo" required />
        </div>
        <div>
            <button type="submit" className="btn btn-primary">{editing ? 'Actualizar' : 'Crear'}</button>
        </div>
      </form>
      {personas.length > 0 ? (
        <ul className='list_group'>
          {personas.map(persona => (
            <li key={persona.id} className="list-group-item d-flex justify-content-between align-items-center">
              {persona.id_persona} - {persona.nombre_persona} -{persona.apellido_persona}-{persona.fecha_nacimiento_persona}-{persona.edad_persona}-{persona.genero_persona}-{persona.direccion_persona}-{persona.telefono_persona}-{persona.correo_persona}
              <div>
                <button onClick={() => handleEdit(persona)} className="btn btn-warning btn-sm mr-2">Editar</button>
                <button onClick={() => handleDelete(persona.id)} className="btn btn-danger btn-sm">Eliminar</button>
              </div>
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