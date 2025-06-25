const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export const obtenerRespuestaIA = async (userMessage, context = '') => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: context + '\n\n' + userMessage }]
      }
    ]
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    || 'Lo siento, no entendí eso.'

  return text
}
