import React, { useState, useEffect, useRef } from 'react';

// --- 1. Definimos el "molde" para un objeto de Mensaje ---
// (Coincide con lo que envía la API y el WebSocket)
interface Message {
  id: number;
  contenido: string;
  remitente_email: string;
  es_mio: boolean;
  fecha: string;
}

interface ChatRoomProps {
  chatId: number;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ chatId }) => {
  // --- 2. El estado ahora guarda un Array de OBJETOS de Mensaje ---
  const [mensajes, setMensajes] = useState<Message[]>([]);
  
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  
  // Ref para la caja de chat, para hacer scroll automático
  const chatBoxRef = useRef<HTMLDivElement>(null); 

  // --- 3. useEffect (El corazón de la lógica) ---
  useEffect(() => {
    // Función para hacer scroll al final
    const scrollToBottom = () => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    };

    // --- A. Función para Cargar el Historial (API REST) ---
    const fetchHistorial = async (authToken: string) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/chat/${chatId}/mensajes/`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo cargar el historial.`);
        }
        
        const historial: Message[] = await response.json();
        console.log("✅ HISTORIAL CARGADO:", historial);
        setMensajes(historial); // ¡Cargamos el historial en el estado!
        scrollToBottom(); // Hacemos scroll al final
        
      } catch (err: any) {
        console.error("❌ Error cargando historial:", err);
        setError(err.message);
      }
    };

    // --- B. Lógica de Conexión (WebSocket) ---
    console.log("🔍 1. Buscando token...");
    let token = localStorage.getItem('access_token');

    if (!token) {
      setError("No hay sesión activa. Por favor inicia sesión.");
      return;
    }
    
    token = token.replace(/"/g, ''); // Limpiamos el token
    console.log("✅ 2. Token encontrado y limpio.");

    // --- C. ¡Ejecutamos todo! ---
    // 1. Cargamos el historial
    fetchHistorial(token); 
    
    // 2. Nos conectamos al WebSocket
    const wsUrl = `ws://localhost:8000/ws/chat/${chatId}/?token=${token}`;
    console.log("🔗 3. Conectando a:", wsUrl);
    
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => console.log("🟢 CONEXIÓN EXITOSA (WebSocket).");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Mensaje WebSocket recibido:", data);
        
        // El backend ahora nos envía un objeto 'message' completo
        if (data.message) {
          const nuevoMsg: Message = data.message;
          // Agregamos el nuevo mensaje a la lista
          setMensajes((prev) => [...prev, nuevoMsg]);
          // (No necesitamos hacer scroll aquí, el 'useEffect' de abajo lo hará)
        }
      } catch (e) { console.error("Error al procesar mensaje WS:", e); }
    };

    socket.onclose = (e) => console.log(`🔴 Desconectado. Código: ${e.code}`);
    socket.onerror = (e) => console.error("⚠️ Error en WebSocket:", e);

    return () => {
      console.log("🧹 Limpiando conexión...");
      socket.close();
      socketRef.current = null;
    };
  }, [chatId]);

  // Scroll al final cada vez que 'mensajes' cambie
  useEffect(() => {
    if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [mensajes]);


  // --- 4. Función de Enviar Mensaje ---
  const handleEnviarMensaje = () => {
    if (!nuevoMensaje.trim() || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      setError("Error de conexión. No se puede enviar.");
      return;
    }
    // Enviamos el mensaje al servidor
    socketRef.current.send(JSON.stringify({
      'message': nuevoMensaje
    }));
    setNuevoMensaje(""); // Limpiamos el input
  };

  // --- 5. El Dibujo (JSX) ---
  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto mt-10 bg-white">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Chat Room (ID: {chatId})</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Caja de mensajes (con ref para scroll) */}
      <div 
        ref={chatBoxRef}
        className="h-80 overflow-y-auto border p-3 mb-4 bg-gray-50 rounded space-y-3"
      >
        {mensajes.length === 0 && !error ? (
          <p className="text-gray-400 text-center mt-10">Cargando historial o no hay mensajes aún...</p>
        ) : (
          mensajes.map((msg) => (
            // Alinear el mensaje a la derecha si 'es_mio' es true
            <div key={msg.id} className={`flex ${msg.es_mio ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`p-3 rounded-lg max-w-[80%] shadow-sm ${
                  msg.es_mio 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {/* Opcional: mostrar quién lo envió si NO es mío */}
                {!msg.es_mio && (
                  <div className="text-xs font-bold text-pink-500 mb-1">
                    {msg.remitente_email.split('@')[0]}
                  </div>
                )}
                <div>{msg.contenido}</div>
                <div className={`text-xs mt-1 ${msg.es_mio ? 'text-blue-200' : 'text-gray-500'}`}>
                  {new Date(msg.fecha).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input y Botón */}
      <div className="flex gap-2">
        <input 
          type="text" 
          className="flex-1 border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          onKeyDown={(e) => e.key === 'Enter' && handleEnviarMensaje()}
          disabled={!!error}
        />
        <button 
          className="bg-blue-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
          onClick={handleEnviarMensaje}
          disabled={!!error}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;