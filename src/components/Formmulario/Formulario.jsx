import React, { useState } from 'react'

const Formulario = ({ onSave }) => {
  const [datos, setDatos] = useState({
    miembros: '',
    ninos: '',
    edades: '',
    ciudad: ''
  })

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setDatos({
      ...datos,
      [name]: value
    })
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    console.log('Formulario enviado con datos:', datos)
    onSave(datos) // Llama al padre (Home.jsx) para guardar en localStorage
  }

  return (
    <form onSubmit={manejarEnvio}>
      <h2>Queremos conocerte mejor 😊</h2>

      <label>
        ¿Cuántos miembros hay en tu familia?
        <input
          type="number"
          name="miembros"
          value={datos.miembros}
          onChange={manejarCambio}
          required
        />
      </label>

      <label>
        ¿Cuántos niños hay?
        <input
          type="number"
          name="ninos"
          value={datos.ninos}
          onChange={manejarCambio}
          required
        />
      </label>

      <label>
        ¿Qué edades tienen los niños? (separadas por comas)
        <input
          type="text"
          name="edades"
          value={datos.edades}
          onChange={manejarCambio}
          required
        />
      </label>

      <label>
        ¿En qué ciudad vives?
        <input
          type="text"
          name="ciudad"
          value={datos.ciudad}
          onChange={manejarCambio}
          required
        />
      </label>

      <button type="submit">Guardar y continuar</button>
    </form>
  )
}

export default Formulario
