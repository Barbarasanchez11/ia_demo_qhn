import React, { useState } from 'react'

const Chatbot = () => {
  const [mensajes, setMensajes] = useState([
    { emisor: 'bot', texto: '¡Hola! ¿En qué puedo ayudarte hoy?' }
  ])
  const [entrada, setEntrada] = useState('')

  const enviarMensaje = async () => {
    if (entrada.trim() === '') return

    const mensajeUsuario = { emisor: 'usuario', texto: entrada }
    setMensajes((prev) => [...prev, mensajeUsuario])
    setEntrada('')

    const respuestaBot = await obtenerRespuestaIA(entrada)
    setMensajes((prev) => [...prev, { emisor: 'bot', texto: respuestaBot }])
  }

  const obtenerRespuestaIA = async (texto) => {
    // Aquí iría la integración con Google AI Studio
    return `Estoy procesando tu solicitud: "${texto}"`
  }

  return (
    <div>
      <div className="chat-box" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        {mensajes.map((msg, idx) => (
          <p key={idx}><strong>{msg.emisor}:</strong> {msg.texto}</p>
        ))}
      </div>
      <input
        type="text"
        value={entrada}
        onChange={(e) => setEntrada(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  )
}

export default Chatbot
