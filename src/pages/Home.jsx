import React, { useEffect, useState } from 'react'
import Formulario from '../components/Formulario'
import Chatbot from '../components/Chatbot'

const Home = () => {
  const [tienePerfil, setTienePerfil] = useState(false)

  console.log('¿Tiene perfil guardado?', tienePerfil)

  useEffect(() => {
    const datosGuardados = localStorage.getItem('perfil_usuario')

    if (datosGuardados) {
      console.log('Perfil encontrado en localStorage:', JSON.parse(datosGuardados))
      setTienePerfil(true)
    } else {
      console.log('No hay perfil guardado aún.')
    }
  }, [])

  const manejarGuardadoPerfil = (datos) => {
    console.log('Guardando perfil del usuario:', datos)
    localStorage.setItem('perfil_usuario', JSON.stringify(datos))
    setTienePerfil(true)
  }

  return (
    <div>
      <h1>Bienvenido a Qué hacer con los niños</h1>

      {tienePerfil ? (
        <Chatbot />
      ) : (
        <Formulario onSave={manejarGuardadoPerfil} />
      )}
    </div>
  )
}

export default Home
