// ChatView.tsx
import React, { useRef, useEffect, useState } from 'react';

// 🟢 ASUNCIÓN DE IMPORTS DE TIPOS
import { Message } from '../../hooks/types'; 

// 🟢 INTERFAZ COMPLETA DE PROPS (Soluciona el error de tipado)
interface ChatViewProps {
    chatId: number;
    contactPhotoUrl: string;
    contactName: string; // Asumo que también necesitas el nombre
    contactLastSeen?: string; // Última vez en línea del contacto
    contactIsOnline?: boolean; // Estado aproximado del contacto
    mensajes: Message[];                 // <--- ¡Propiedad Requerida!
    sendMessage: (content: string) => void; // <--- ¡Propiedad Requerida!
    wsStatus: string;                    // <--- ¡Propiedad Requerida!
    isInputDisabled: boolean;            // <--- ¡Propiedad Requerida!
    onTogglePanel?: () => void;          // Mostrar/ocultar lista de chats
    onCloseChat?: () => void;
    onClearHistory?: () => void;
}

const MessageStatusIcon: React.FC<{ leido: boolean }> = ({ leido }) => {
    // Corazón Leído (corazón completo rojo/rosa)
    if (leido) {
        return (
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        );
    }
    
    // Corazón Enviado/Entregado (corazón contorneado o gris)
    return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
    );
};

const ChatView: React.FC<ChatViewProps> = ({
    chatId,
    contactPhotoUrl, // Se mantiene por compatibilidad, aunque el encabezado principal está en ChatGeneral
    contactName,     // Idem: el nombre se muestra en el header de ChatGeneral
    contactLastSeen,
    contactIsOnline,
    mensajes,
    sendMessage,
    wsStatus,
    isInputDisabled,
    onTogglePanel,
    onCloseChat,
    onClearHistory,
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [inputMessage, setInputMessage] = useState('');
    const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

    // Placeholder para abrir el perfil del contacto al tocar la imagen
    const handleOpenProfile = () => {
        // Aquí se podría usar useNavigate de react-router-dom, por ejemplo:
        // navigate(`/perfil/${chatId}?userId=${...}`);
        // Por ahora solo mostramos un aviso para que el equipo de perfil lo conecte luego.
        alert(`Aquí debería ir al perfil de ${contactName}`);
        console.log("[TODO] Ir al perfil del contacto del chat:", contactName);
    };

    // Función para desplazarse al final de los mensajes
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Efecto para desplazarse al final cada vez que llegan nuevos mensajes
    useEffect(() => {
        scrollToBottom();
    }, [mensajes]);


    const handleSend = () => {
        if (inputMessage.trim() !== '') {
            sendMessage(inputMessage.trim()); // Usamos la prop de la función
            setInputMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isInputDisabled) {
            handleSend();
        }
    };

    // 🟢 Mensaje de estado de la conexión
    const getConnectionStatusMessage = () => {
        switch (wsStatus) {
            case 'open':
                return <span className="text-green-500">Conectado</span>;
            case 'connecting':
                return <span className="text-yellow-500">Conectando...</span>;
            case 'closed':
            case 'error':
                return <span className="text-red-500">Desconectado</span>;
            default:
                return null;
        }
    }

    const handleHeaderMenuAction = (action: 'Bloquear' | 'Reportar' | 'Vaciar' | 'Cerrar') => {
        switch (action) {
            case 'Bloquear':
                alert(`Bloqueando a ${contactName}...`);
                break;
            case 'Reportar':
                // Placeholder: integración futura con módulo de reportes
                console.log("[TODO] Abrir flujo de reporte para:", contactName);
                alert(`Aquí debería abrirse la pantalla de reporte para ${contactName}`);
                break;
            case 'Vaciar':
                if (window.confirm(
                    `¿Estás seguro de que quieres eliminar todos los mensajes de la conversación con ${contactName}? Esta acción no se puede deshacer.`
                )) {
                    onClearHistory && onClearHistory();
                }
                break;
            case 'Cerrar':
                onCloseChat && onCloseChat();
                break;
        }
        setIsHeaderMenuOpen(false);
    };

    return (
        <div className="flex flex-col h-full bg-pink-50">
            <div className="flex items-center justify-between p-4 bg-white border-b border-pink-100 shadow-sm relative">
                <div className="flex items-center flex-1 min-w-0 gap-2">
                    {/* Botón de flecha para mostrar/ocultar lista de chats */}
                    {onTogglePanel && (
                        <button
                            type="button"
                            onClick={onTogglePanel}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-pink-200 text-pink-600 shadow-sm hover:bg-pink-50 hover:border-pink-400 transition-colors flex-shrink-0"
                            aria-label="Mostrar/ocultar lista de chats"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                    )}

                    <img 
                        src={contactPhotoUrl}
                        alt="Contacto" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-pink-200 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-pink-300 hover:ring-offset-1 transition"
                        onClick={handleOpenProfile}
                        title="Ver perfil"
                    />
                    <div className="ml-2 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {contactName}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                            {contactIsOnline
                                ? 'En línea'
                                : contactLastSeen
                                    ? `Últ. vez en línea: ${contactLastSeen}`
                                    : 'Desconectado'}
                        </p>
                    </div>
                </div>

                <div className="relative ml-2">
                    <button
                        className="flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => setIsHeaderMenuOpen(prev => !prev)}
                        title="Opciones de conversación"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </button>

                    {isHeaderMenuOpen && (
                        <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl border border-gray-200 z-40 py-2">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                    {contactName}
                                </p>
                                <p className="text-xs text-gray-500">Opciones de conversación</p>
                            </div>

                            <button
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                                onClick={() => handleHeaderMenuAction('Bloquear')}
                            >
                                <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                                Bloquear usuario
                            </button>

                            <button
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                                onClick={() => handleHeaderMenuAction('Reportar')}
                            >
                                <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                                Reportar usuario
                            </button>

                            <button
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                                onClick={() => handleHeaderMenuAction('Vaciar')}
                            >
                                <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Vaciar chat
                            </button>

                            <div className="border-t border-gray-100 my-1" />

                            <button
                                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                onClick={() => handleHeaderMenuAction('Cerrar')}
                            >
                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                Cerrar conversación
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Cuerpo de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mensajes.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex items-end ${msg.es_mio ? 'justify-end' : 'justify-start'}`}
                    >
                        {/* Avatar solo para los mensajes que me envían (no son míos) */}
                        {!msg.es_mio && (
                            <img
                                src={contactPhotoUrl}
                                alt={contactName}
                                className="w-8 h-8 rounded-full object-cover mr-2 shadow-sm border border-pink-200"
                            />
                        )}

                        <div 
                            className={`max-w-xs px-4 py-2 rounded-2xl ${
                                msg.es_mio 
                                    ? 'bg-pink-500 text-white rounded-br-none' 
                                    : 'bg-white text-gray-800 border border-pink-100 rounded-tl-none'
                            }`}
                        >
                            <span className="block break-words">
                                {msg.contenido}
                            </span>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className={`text-[10px] ${
                                    msg.es_mio ? 'text-pink-100/80' : 'text-gray-400'
                                }`}>
                                    {new Date(msg.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>

                                {/* Chulitos tipo WhatsApp solo para mis mensajes */}
                                {msg.es_mio && (
                                    <span className="inline-flex items-center gap-[2px]">
                                        {msg.estado === 'sending' && (
                                            // Relojito: mensaje pendiente de envío
                                            <svg className="w-3.5 h-3.5 text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                                                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        {msg.estado === 'failed' && (
                                            // Error: mensaje no enviado
                                            <svg className="w-3.5 h-3.5 text-red-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                                                <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                                <circle cx="12" cy="15.5" r="0.8" fill="currentColor" />
                                            </svg>
                                        )}
                                        {(!msg.estado || msg.estado === 'sent') && (
                                            // Un chulito: mensaje enviado (almacenado en el servidor)
                                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 13l3 3 8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                        {msg.estado === 'read' && (
                                            // Dos chulitos: mensaje leído (dos tonos de azul, muy juntos)
                                            <span className="inline-flex items-center">
                                                <svg className="w-4 h-4 text-sky-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <svg className="w-4 h-4 text-sky-400 -ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 13l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input del Chat */}
            <div className="p-4 border-t-0 flex bg-pink-50">
                <input
                    type="text"
                    className={`flex-1 px-4 py-2 rounded-full border focus:outline-none transition-colors ${
                        isInputDisabled
                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                            : inputMessage.trim() === ''
                                ? 'bg-gray-100 border-gray-300 focus:ring-2 focus:ring-gray-300'
                                : 'bg-white border-pink-400 focus:ring-2 focus:ring-pink-300'
                    }`}
                    placeholder={isInputDisabled ? "Cargando..." : "Escribe un mensaje..."}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isInputDisabled}
                />
                <button
                    className={`ml-3 flex items-center justify-center w-11 h-11 rounded-full text-white font-semibold transition-colors shadow-sm ${
                        isInputDisabled || inputMessage.trim() === ''
                            ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                            : 'bg-pink-500 hover:bg-pink-600 hover:shadow-md cursor-pointer'
                    }`}
                    onClick={handleSend}
                    disabled={isInputDisabled || inputMessage.trim() === ''}
                    aria-label="Enviar mensaje"
                >
                    {/* Icono tipo WhatsApp (avión de papel) */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatView;
