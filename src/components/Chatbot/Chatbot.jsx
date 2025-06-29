import React, { useState, useEffect } from 'react'
import { obtenerRespuestaIA } from '../../services/ia'
import  filterEvents  from '../../utils/filterEvents'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte hoy?' }
  ])
  const [input, setInput] = useState('')
  const [userProfile, setUserProfile] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('perfil_usuario')
    if (saved) {
      const profile = JSON.parse(saved)
      const summary = `Este usuario vive en ${profile.ciudad}, tiene ${profile.ninos} niños de edades ${profile.edades} y ${profile.miembros} miembros en total.`
      setUserProfile(summary)
    }
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    console.log('📨 Enviado por el usuario:', input)

    // Obtener perfil y filtrar eventos
    let eventsContext = ''
    const perfil = localStorage.getItem('perfil_usuario')
    if (perfil) {
      const p = JSON.parse(perfil)
      const ages = p.edades.split(',').map(e => parseInt(e.trim(), 10))
      const filtered = filterEvents({
        city: p.ciudad,
        ages,
        category: p.categoria || ''
      })

      console.log('👤 Perfil:', p)
      console.log('🎯 Eventos encontrados:', filtered)

      if (filtered.length > 0) {
        eventsContext = 'Eventos:\n' + filtered.map(e =>
          `• ${e.nombre} (${e.categoria}), ${e.precio}€, ${e.fecha}`
        ).join('\n')
      } else {
        eventsContext = 'No hay eventos que coincidan en tu ciudad/edad.'
      }
    }

    const context = `${userProfile}\n${eventsContext}`
    console.log('🧠 Contexto para Gemini:', context)

    const botReply = await obtenerRespuestaIA(input, context)
    console.log('📥 Respuesta del bot:', botReply)

    const finalReply = botReply || 'Aquí tienes algunas actividades para niños: Taller de pintura, Cuentacuentos y Teatro familiar.'
    setMessages(prev => [...prev, { sender: 'bot', text: finalReply }])
  }

  return (
    <div>
      <div className="chat-box" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.sender === 'bot' ? '🤖 Bot' : '👤 Tú'}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  )
}

export default Chatbot
