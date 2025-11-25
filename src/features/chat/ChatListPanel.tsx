import React, { useState } from 'react';
import { MOCK_CHAT_LIST } from './mock-chat-data';

interface ChatListPanelProps {
    onSelectChat: (chatId: number) => void;
    selectedChatId: number | null;
    onCloseChat: (chatId: number) => void;
}

const ChatListPanel: React.FC<ChatListPanelProps> = ({ onSelectChat, selectedChatId, onCloseChat }) => {
    const [searchTerm, setSearchTerm] = useState('');
    // 🟢 Nuevo estado: Almacena el ID del chat cuyo menú de opciones está abierto.
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const filteredChats = MOCK_CHAT_LIST.filter(chat =>
        chat.nombreContacto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🟢 Función para manejar las acciones del menú
    const handleMenuAction = (action: string, chatId: number, chatName: string) => {
        console.log(`Acción: ${action} realizada en el Chat ID: ${chatId} (${chatName})`);
        setOpenMenuId(null); // Cierra el menú después de la acción

        // Aquí iría la lógica real
        switch (action) {
            case 'Bloquear':
                alert(`Bloqueando a ${chatName}...`);
                break;
            case 'Reportar':
                alert(`Reportando a ${chatName}...`);
                break;
            case 'Cerrar':
                onCloseChat(chatId);
                break;
            case 'Vaciar':
                const confirmClear = window.confirm(
                `¿Estás seguro de que quieres eliminar todos los mensajes de la conversación con ${chatName}? Esta acción no se puede deshacer.`
                );
                if (confirmClear) {
                    alert(`Todos los mensajes de ${chatName} han sido eliminados.`);
                    // En una implementación real, llamaríamos a la API aquí
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className="w-80 bg-pink-50 border-r border-gray-200 flex flex-col h-full">
            {/* Encabezado del panel */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Chats</h2>
                {/* Barra de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full p-2 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Lista de Chats Desplazable */}
            <div className="flex-1 overflow-y-auto">
                {filteredChats.map((chat) => (
                    // 🟢 Se hace click en todo el div para seleccionar el chat, 
                    //    pero se ignora si el click es en el botón de menú
                    <div
                        key={chat.id}
                        className={`flex items-center p-3 border-b border-pink-200 relative 
                                    hover:bg-pink-50 transition-colors duration-150
                                    ${selectedChatId === chat.id ? 'bg-pink-200/70 border-l-4 border-pink-600' : ''}`}
                        onClick={() => {
                            onSelectChat(chat.id);
                            setOpenMenuId(null); // Cierra cualquier menú abierto al seleccionar otro chat
                        }}
                    >
                        {/* Foto de perfil */}
                        <img
                            src={chat.fotoContacto}
                            alt={chat.nombreContacto}
                            className="w-12 h-12 rounded-full mr-3 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-800 truncate">{chat.nombreContacto}</p>
                                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.horaUltimoMensaje}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{chat.ultimoMensaje}</p>
                        </div>

                        {/* 🎯 Menú de 3 puntos - Posición y diseño mejorado */}
                        <div className="relative flex-shrink-0 ml-2">
                            <button
                                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(openMenuId === chat.id ? null : chat.id);
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                </svg>
                            </button>
                            
                            {/* 🎯 Menú desplegable - Diseño mejorado */}
                            {openMenuId === chat.id && (
                                <div className="absolute right-0 top-10 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-30 py-2">
                                    {/* Header del menú */}
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{chat.nombreContacto}</p>
                                        <p className="text-xs text-gray-500">Opciones de chat</p>
                                    </div>
                                    
                                    <button 
                                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuAction('Bloquear', chat.id, chat.nombreContacto);
                                        }}
                                    >
                                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                        </svg>
                                        Bloquear usuario
                                    </button>
                                    
                                    <button 
                                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuAction('Reportar', chat.id, chat.nombreContacto);
                                        }}
                                    >
                                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z"/>
                                        </svg>
                                        Reportar usuario
                                    </button>
                                    
                                    <button 
                                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuAction('Vaciar', chat.id, chat.nombreContacto);
                                        }}
                                    >
                                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                        Vaciar chat
                                    </button>
                                    
                                    <div className="border-t border-gray-100 my-1"></div>
                                    
                                    <button 
                                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuAction('Cerrar', chat.id, chat.nombreContacto);
                                        }}
                                    >
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                        Cerrar conversación
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Notificaciones (el círculo rojo) */}
                        {chat.notificaciones > 0 && (
                            <span className="ml-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {chat.notificaciones}
                            </span>
                        )}
                    </div>
                ))}
                {filteredChats.length === 0 && (
                    <p className="text-gray-500 text-center mt-8">No se encontraron chats.</p>
                )}
            </div>
        </div>
    );
};

export default ChatListPanel;