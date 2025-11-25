import React, { useState } from 'react';
import ChatListPanel from './ChatListPanel';
import ChatView from './ChatView';
// Importa la función para buscar el chat por ID
import { getChatById, ChatListItem } from './mock-chat-data';

const ChatGeneral: React.FC = () => {
  // Estado para saber qué chat está seleccionado. Por defecto, el Chat ID 1.
  const [selectedChatId, setSelectedChatId] = useState<number | null>(1); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🟢 ESTADO: Controla si el panel de la izquierda está visible.
  const [isPanelOpen, setIsPanelOpen] = useState(true); 

  // 🟢 FUNCIÓN: Alterna la visibilidad del panel.
  const togglePanel = () => {
    setIsPanelOpen(prev => !prev);
  };
    
  // Esta función se llama cuando se hace clic en un chat de la lista
  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
    setIsMenuOpen(false); // Cierra el menú al cambiar de chat
    // Opcional: Cerrar el panel automáticamente en vistas pequeñas
    // setIsPanelOpen(false); 
  };

  // Busca la información del chat seleccionado
  const selectedChat: ChatListItem | undefined = selectedChatId ? getChatById(selectedChatId) : undefined;


  const handleChatClosed = (chatIdToClose: number) => {
    console.log(`Cerrando chat con ID: ${chatIdToClose}`);
    // Si el chat cerrado es el que está seleccionado, deselecciónalo
    if (selectedChatId === chatIdToClose) {
        setSelectedChatId(null);
    }
  };

  const handleClearChat = (chatIdToClear: number) => {
    const chatName = selectedChat?.nombreContacto || 'el chat';
    const confirmClear = window.confirm(
      `¿Estás seguro de que quieres eliminar todos los mensajes de la conversación con ${chatName}? Esta acción no se puede deshacer.`
    );
    
    if (confirmClear) {
      console.log(`Vaciando chat con ID: ${chatIdToClear}`);
      
      // Aquí llamaríamos a la API en producción
      // Por ahora, actualizamos el estado local
      if (selectedChatId === chatIdToClear) {
        // Si el chat vaciado es el seleccionado, limpiamos los mensajes
        setSelectedChatId(null); // O podemos recargar el chat vacío
        setTimeout(() => setSelectedChatId(chatIdToClear), 100); // Recarga el chat
      }
      
      alert(`Todos los mensajes de ${chatName} han sido eliminados.`);
      setIsMenuOpen(false);
    }
  };

  
  const handleMenuAction = (action: string, chatId: number) => {
    console.log(`Acción: ${action} realizada en el Chat ID: ${chatId}`);
    setIsMenuOpen(false); // Cierra el menú después de la acción
    
    switch (action) {
        case 'Bloquear':
            alert(`Bloqueando a ${selectedChat?.nombreContacto}...`);
            break;
        case 'Reportar':
            alert(`Reportando a ${selectedChat?.nombreContacto}...`);
            break;
        case 'Cerrar':
            const confirmClose = window.confirm(`¿Estás seguro de que quieres cerrar la conversación con ${selectedChat?.nombreContacto}?`);
            
            if (confirmClose) {
                handleChatClosed(chatId); // Llama a la nueva función
            }
            break;
        case 'Vaciar':
            handleClearChat(chatId);
            break;
        default:
            break;
    }
  };

  // 🟢 CLASES DE TAILWIND PARA LA TRANSICIÓN: 
  // 'w-80' (visible) vs 'w-0' (oculto). Overflow-hidden es crucial.
  const panelClasses = `transition-all duration-300 ease-in-out ${
    isPanelOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'
  }`;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Panel de la izquierda (Lista de Chats) */}
      {/* 🟢 El contenedor aplica la transición y el ancho condicional */}
      <div className={panelClasses}>
        <ChatListPanel 
          onSelectChat={handleSelectChat} 
          selectedChatId={selectedChatId} 
          onCloseChat={handleChatClosed}
        />
      </div>

      {/* Panel de la derecha (Vista del Chat Actual) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Encabezado del Chat - Versión Mejorada */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
          {/* Botón hamburguesa y info del contacto */}
          <div className="flex items-center flex-1 min-w-0">
            <button 
              onClick={togglePanel}
              className="text-gray-500 hover:text-gray-800 mr-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={isPanelOpen ? "Ocultar Chats" : "Mostrar Chats"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            
            {selectedChatId && selectedChat ? (
              <div className="flex items-center min-w-0">
                <img 
                  src={selectedChat.fotoContacto}
                  alt="Contacto" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-pink-200" 
                />
                <div className="ml-3 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {selectedChat.nombreContacto}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">En línea</p>
                </div>
              </div>
            ) : (
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">Chats de Cupido</h3>
              </div>
            )}
          </div>

          {/* Menú de 3 puntos - Posición mejorada */}
          {selectedChatId && selectedChat && (
            <div className="relative">
              <button 
                className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
              </button>
              
              {/* Menú desplegable - Diseño mejorado */}
              {isMenuOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-2">
                  {/* Header del menú */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">Opciones del chat</p>
                    <p className="text-xs text-gray-500 truncate">Conversación con {selectedChat.nombreContacto}</p>
                  </div>
                  
                  {/* Items del menú */}
                  <button 
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                    onClick={() => handleMenuAction('Bloquear', selectedChatId)}
                  >
                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Bloquear usuario
                  </button>
                  
                  <button 
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                    onClick={() => handleMenuAction('Reportar', selectedChatId)}
                  >
                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    Reportar usuario
                  </button>
                  
                  <button 
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                    onClick={() => handleMenuAction('Vaciar', selectedChatId)}
                  >
                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Vaciar chat
                  </button>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button 
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => handleMenuAction('Cerrar', selectedChatId)}
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Cerrar conversación
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Contenido principal del Chat */}
        {selectedChatId && selectedChat ? ( 
          <div className="flex-1 overflow-hidden">
            <ChatView 
              chatId={selectedChatId} 
              contactPhotoUrl={selectedChat.fotoContacto} 
            />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500 text-lg">
            Selecciona un chat para empezar a conversar.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatGeneral;