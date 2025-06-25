import React, { useState, useEffect } from 'react'
import { obtenerRespuestaIA } from '../../services/ia'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte hoy?' }
  ])
  const [input, setInput] = useState('')
  const [userProfile, setUserProfile] = useState('')

  useEffect(() => {
    const savedProfile = localStorage.getItem('perfil_usuario')
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      const summary = `Este usuario vive en ${profile.ciudad}, tiene ${profile.ninos} niños de edades ${profile.edades} y ${profile.miembros} miembros en total en su familia.`
      setUserProfile(summary)
    }
  }, [])


  const sendMessage = async () => {
    if (input.trim() === '') return

    const userMessage = { sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    const botReply = await obtenerRespuestaIA(input, userProfile)
    const botMessage = { sender: 'bot', text: botReply }

    setMessages((prev) => [...prev, botMessage])
  }

  return (
    <div>
      <div
        className="chat-box"
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          marginBottom: '1rem',
          maxHeight: '400px',
          overflowY: 'auto'
        }}
      >
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.sender === 'bot' ? 'Bot' : 'Tú'}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  )
}

export default Chatbot
