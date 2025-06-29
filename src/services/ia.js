
import  events from '../data/events.js';

const HUGGINGFACE_API_KEY = import.meta.env.VITE_HF_TOKEN;
const HF_MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

// Intenta con Hugging Face, si falla, responde con eventos locales
export const obtenerRespuestaIA = async (userMessage, context = '') => {
  const prompt = context ? `${context}\n\nPregunta del usuario: ${userMessage}` : userMessage;

  try {
    const response = await fetch(HF_MODEL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error de Hugging Face: ${response.status}`, errorText);
      throw new Error('Falla Hugging Face');
    }

    const data = await response.json();
    const respuesta = data?.[0]?.generated_text;
    return respuesta || 'Lo siento, no entendí eso.';
  } catch (error) {
    console.warn('⚠️ Usando fallback local por error o demo sin API');

    // Simulación básica con eventos locales
    const ciudad = 'Madrid';
    const edad = 4;

    const palabrasClave = ['museo', 'camping', 'mercadillo', 'parque', 'yoga', 'viaje', 'excursión'];
    const keyword = palabrasClave.find(palabra =>
    userMessage.toLowerCase().includes(palabra)
    );

    const eventosFiltrados = events.filter(ev =>
      ev.ciudad.toLowerCase() === ciudad.toLowerCase() &&
      edad >= ev.edad_min &&
      edad <= ev.edad_max &&
      (!keyword || ev.nombre.toLowerCase().includes(keyword) || ev.categoria.toLowerCase().includes(keyword))
    );
    if (!events || !Array.isArray(events)) {
      console.error(' No se cargaron eventos.');
      return 'No se pudo acceder a los eventos locales.';
    }
    

    if (eventosFiltrados.length === 0) {
      return "No encontré eventos disponibles para tu ciudad y edad.";
    }

    const respuesta = eventosFiltrados.map(ev =>
      `📍 ${ev.nombre} (${ev.categoria}) - ${ev.fecha} - ${ev.precio}€`
    ).join('\n');

    return respuesta;
  }
};
