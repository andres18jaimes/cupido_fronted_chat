import React, { useState, useEffect, useRef } from 'react';
//import { MOCK_HISTORIAL_CHAT_1, Message } from './mock-chat-data';
import { Message, getHistorialByChatId, MessageStatus } from './mock-chat-data';


interface ChatViewProps {
  chatId: number;
  contactPhotoUrl: string;
}

// 🟢 COMPONENTE INTERNO: Icono de Estado del Mensaje (Corazones)
const MessageStatusIcon: React.FC<{ status: MessageStatus }> = ({ status }) => {
    
  // Corazón Partido (usando icono de advertencia para 'failed')
  if (status === 'failed') {
      return (
          <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
      );
  }

  // Corazón Completo (Enviado o Entregado - Usamos un corazón sólido)
  // El color diferenciará Enviado (gris) de Entregado (pink/rojo claro)
  const color = status === 'sent' ? 'text-gray-400' : 'text-pink-500';

  // Corazón Flecha (Leído - Usamos un corazón rojo fuerte)
  if (status === 'read') {
      return (
           <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              {/* Opcionalmente añadir un pequeño path para simular la flecha o un check */}
          </svg>
      );
  }
  
  // Corazón Normal (Enviado 'sent' o Entregado 'delivered')
  return (
      <svg className={`w-4 h-4 ${color}`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
  );
};


const ChatView: React.FC<ChatViewProps> = ({ chatId, contactPhotoUrl }) => {
  const [mensajes, setMensajes] = useState<Message[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  
  const chatBoxRef = useRef<HTMLDivElement>(null); 


    // 🟢 FOTO DEL USUARIO ACTUAL (Simulación)
  const myPhotoUrl = "https://randomuser.me/api/portraits/women/90.jpg";
  // --- Cargar datos ficticios ---
  useEffect(() => {
    console.log("🟢 Cargando historial del chat:", chatId);
  
    setTimeout(() => {
      const historial = getHistorialByChatId(chatId);
      setMensajes(historial);

    }, 300);
  
  }, [chatId]);
  

  // Scroll automático al final
  useEffect(() => {
    if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [mensajes]);

  // --- Enviar Mensaje (Simulado) ---
  const handleEnviarMensaje = () => {
    if (!nuevoMensaje.trim()) return;

    const mensajeFicticio: Message = {
      id: Date.now(), // ID temporal único
      contenido: nuevoMensaje,
      remitente_email: "maestro@unipamplona.edu.co", 
      es_mio: true,
      fecha: new Date().toISOString(),
      estado: 'read'
    };

    setMensajes((prev) => [...prev, mensajeFicticio]);
    setNuevoMensaje(""); 
  };

  return (
    <div className="flex flex-col h-full bg-pink-50"> {/* Ocupa toda la altura disponible */}
      
      {/* Caja de mensajes */}
      <div 
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
      >
        {mensajes.length === 0 ? (
        <div className="flex flex-col h-full items-center justify-center text-gray-400 space-y-3">
        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <p className="text-lg">No hay mensajes</p>
        <p className="text-sm">Envía un mensaje para iniciar la conversación</p>
        </div>
        ) : (
          mensajes.map((msg) => (
            <div key={msg.id} className={`flex items-end ${msg.es_mio ? 'justify-end' : 'justify-start'}`}>

              {  }
              {!msg.es_mio && (
                <img 
                  src={contactPhotoUrl} 
                  alt="Contacto" 
                  className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                />
              )}

              <div 
                className={`p-3 rounded-lg max-w-[70%] shadow-sm text-sm ${
                  msg.es_mio 
                    ? 'bg-pink-400 text-white rounded-br-none' 
                    : 'bg-gray-200 border border-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <div>{msg.contenido}</div>

                <div className={`text-xs mt-1 text-right ${msg.es_mio ? 'text-red-100' : 'text-gray-400'}`}>
                  {new Date(msg.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {/* Renderiza el icono de estado solo si el mensaje es mío */}
                    {msg.es_mio && (
                        <span className="ml-1">
                            <MessageStatusIcon status={msg.estado} />
                        </span>
                    )}
                </div>
              </div>

              {msg.es_mio && (
                <img 
                  src={myPhotoUrl} 
                  alt="Yo" 
                  className="w-8 h-8 rounded-full object-cover ml-2 flex-shrink-0"
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Input y Botón (Pie del chat) */}
      <div className="p-3 border-t border-gray-200 bg-white flex gap-2">
        <input 
          type="text" 
          className="flex-1 border border-gray-300 p-2 rounded-full focus:ring-2 focus:ring-red-300 outline-none px-4"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          onKeyDown={(e) => e.key === 'Enter' && handleEnviarMensaje()}
        />
        <button 
          className="bg-pink-300 text-white p-2 rounded-full hover:bg-pink-600 transition-colors w-10 h-10 flex items-center justify-center"
          onClick={handleEnviarMensaje}
        >
          <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default ChatView;