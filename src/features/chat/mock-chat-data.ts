// --- ESTADOS POSIBLES DEL MENSAJE ---
export type MessageStatus = 
  | 'sending'     // ⏳ Enviándose
  | 'sent'        // ✔️ Enviado (tu medio corazón)
  | 'delivered'   // ❤️ Entregado (corazón completo gris/rosado)
  | 'read'        // 💘 Leído (corazón flechado/rojo)
  | 'failed';     // 💔 No enviado
// --- Molde para un Mensaje Individual ---
export interface Message {
    id: number;
    contenido: string;
    remitente_email: string;
    es_mio: boolean; // ¿Lo envié yo?
    fecha: string; // ISO string para fácil conversión a Date
    estado: MessageStatus;
  }
  
  // --- Molde para un Ítem de la Lista de Chats ---
  export interface ChatListItem {
    id: number;
    nombreContacto: string;
    fotoContacto: string; // URL de una imagen de perfil
    ultimoMensaje: string;
    horaUltimoMensaje: string; // Ej: "10:30 AM"
    notificaciones: number; // Número de mensajes no leídos
  }
  
  // --- DATOS FICTICIOS ---
  
  // Historial de un chat específico (para la sección de la derecha)
  export const MOCK_HISTORIAL_CHAT_1: Message[] = [
    {
      id: 1,
      contenido: "¡Hola! ¿Estás libre para hablar un momento?",
      remitente_email: "juan.perez@test.com",
      es_mio: false,
      fecha: "2025-11-17T10:30:00",
      estado: 'read'
    },
    {
      id: 2,
      contenido: "Claro, dime. ¿Cómo va todo?",
      remitente_email: "maestro@unipamplona.edu.co",
      es_mio: true,
      fecha: "2025-11-17T10:31:00",
      estado: 'read'
    },
    {
      id: 3,
      contenido: "Un poco liado con el proyecto, pero bien. ¿Tú qué tal?",
      remitente_email: "juan.perez@test.com",
      es_mio: false,
      fecha: "2025-11-17T10:32:00",
      estado: 'read'
    },
    {
      id: 4,
      contenido: "Igual, intentando avanzar. ¿Necesitas una mano?",
      remitente_email: "maestro@unipamplona.edu.co",
      es_mio: true,
      fecha: "2025-11-17T10:33:00",
      estado: 'read'
    },
    {
      id: 5,
      contenido: "¡Sí, por favor! Te lo agradecería mucho. ¿Te veo en la biblioteca en 20 minutos?",
      remitente_email: "juan.perez@test.com",
      es_mio: false,
      fecha: "2025-11-17T10:35:00",
      estado: 'read'
    },
    {
      id: 6,
      contenido: "Perfecto, allí estaré.",
      remitente_email: "maestro@unipamplona.edu.co",
      es_mio: true,
      fecha: "2025-11-17T10:36:00",
      estado: 'read'
    }
  ];
  
  // --- Nuevos historiales por chat (mapa) ---
  export const MOCK_HISTORIAL_POR_CHAT: Record<number, Message[]> = {
    1: MOCK_HISTORIAL_CHAT_1,
    2: [
      {
        id: 1,
        contenido: "Hola, soy María 😄 ¿Puedes revisar el material para mañana?",
        remitente_email: "maria.lopez@test.com",
        es_mio: false,
        fecha: "2025-11-16T09:12:00",
        estado: 'sent'
      },
      {
        id: 2,
        contenido: "Claro, lo veo ahora mismo.",
        remitente_email: "maestro@unipamplona.edu.co",
        es_mio: true,
        fecha: "2025-11-16T09:15:00",
        estado: 'read'
      }
    ],
    3: [
      {
        id: 1,
        contenido: "¿Ya tienes el informe? Necesito los datos para el viernes.",
        remitente_email: "carlos.sanchez@test.com",
        es_mio: false,
        fecha: "2025-11-15T13:45:00",
        estado: 'read'
      }
    ],
    4: [
      {
        id: 1,
        contenido: "Te envío la presentación en un rato.",
        remitente_email: "ana.garcia@test.com",
        es_mio: false,
        fecha: "2025-11-10T11:20:00",
        estado: 'read'
      }
    ],
    5: [
      {
        id: 1,
        contenido: "Ok, lo reviso.",
        remitente_email: "pedro.fernandez@test.com",
        es_mio: false,
        fecha: "2025-10-10T08:00:00",
        estado: 'read'
      }
    ],
    6: [
      {
        id: 1,
        contenido: "Confirmo la reunión del jueves.",
        remitente_email: "sofia.martinez@test.com",
        es_mio: false,
        fecha: "2025-10-03T14:00:00",
        estado: 'read'
      }
    ]
  };
  
  // Lista de chats para el panel de la izquierda
  export const MOCK_CHAT_LIST: ChatListItem[] = [
    {
      id: 1,
      nombreContacto: "Juan Pérez",
      fotoContacto: "https://randomuser.me/api/portraits/men/1.jpg",
      ultimoMensaje: "Perfecto, allí estaré.",
      horaUltimoMensaje: "10:36 AM",
      notificaciones: 0
    },
    {
      id: 2,
      nombreContacto: "María López",
      fotoContacto: "https://randomuser.me/api/portraits/women/2.jpg",
      ultimoMensaje: "Nos vemos mañana, ¡que descanses!",
      horaUltimoMensaje: "Ayer",
      notificaciones: 3
    },
    {
      id: 3,
      nombreContacto: "Carlos Sánchez",
      fotoContacto: "https://randomuser.me/api/portraits/men/3.jpg",
      ultimoMensaje: "¿Ya tienes el informe?",
      horaUltimoMensaje: "1:45 PM",
      notificaciones: 0
    },
    {
      id: 4,
      nombreContacto: "Ana García",
      fotoContacto: "https://randomuser.me/api/portraits/women/4.jpg",
      ultimoMensaje: "Te envío la presentación en un rato.",
      horaUltimoMensaje: "Lunes",
      notificaciones: 1
    },
    {
      id: 5,
      nombreContacto: "Pedro Fernández",
      fotoContacto: "https://randomuser.me/api/portraits/men/5.jpg",
      ultimoMensaje: "Ok, lo reviso.",
      horaUltimoMensaje: "10/Oct",
      notificaciones: 0
    },
    {
      id: 6,
      nombreContacto: "Sofía Martínez",
      fotoContacto: "https://randomuser.me/api/portraits/women/6.jpg",
      ultimoMensaje: "Confirmo la reunión del jueves.",
      horaUltimoMensaje: "3/Oct",
      notificaciones: 0
    }
  ];
  
  // --- Helpers ---
  export const getChatById = (id: number): ChatListItem | undefined =>
    MOCK_CHAT_LIST.find((c) => c.id === id);
  
  export const getHistorialByChatId = (id: number): Message[] =>
    MOCK_HISTORIAL_POR_CHAT[id] || [];
  
  // Funcion para vaciar mensajes de un chat
  export const clearChatHistory = (chatId: number): void => {
  if (MOCK_HISTORIAL_POR_CHAT[chatId]) {
    MOCK_HISTORIAL_POR_CHAT[chatId] = [];
  }
};

// --- Función para obtener y modificar el historial ---
export const getMutableHistorialByChatId = (id: number): Message[] => {
  if (!MOCK_HISTORIAL_POR_CHAT[id]) {
    MOCK_HISTORIAL_POR_CHAT[id] = [];
  }
  return MOCK_HISTORIAL_POR_CHAT[id];
};