import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const resources = {
  en: {
    translation: {
      welcome: 'Ask me about our banking services, loans, credit cards, and accounts.',
      askAbout: 'Ask about our banking services...',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      darkMode: 'Toggle theme',
      language: 'Select language',
      assistant: 'Assistant',
      dashboard: 'Dashboard',
      chatTitle: 'Banking Assistant',
      initialMessage: 'Hello! I\'m BluBot, your banking assistant. How can I help you today? You can ask me about:\n\n- Your account balances and credit cards (requires login)\n- Types of loans and their terms\n- Credit card options and benefits\n- Different types of bank accounts\n- Current exchange rates\n\nYou can type your question or click the microphone icon to speak.',
      loginRequired: 'To view your account balances and credit card information, please sign in first using the button in the top right corner.',
      accountInfo: 'Here are your current account balances and credit card information:',
      loanInfo: 'We offer several types of loans:\n\n1. Personal Loans\n- Interest rates from 5.99% APR\n- Terms up to 7 years\n- No prepayment penalties\n\n2. Home Mortgages\n- Fixed and adjustable rates\n- Terms: 15, 20, or 30 years\n- Down payments as low as 3.5%\n\n3. Auto Loans\n- Rates from 3.99% APR\n- Terms up to 72 months\n- New and used vehicles',
      helpOptions: 'I can help you with information about:\n- Your account balances and credit cards (requires login)\n- Loans (personal, mortgage, auto)\n- Credit Cards (rewards, travel, business)\n- Bank Accounts (checking, savings, business)\n- Exchange Rates (daily updates)\n\nWhat would you like to know more about?',
      errorMessage: 'I apologize, but I encountered an error. Please try again.',
    },
  },
  es: {
    translation: {
      welcome: 'Pregúntame sobre nuestros servicios bancarios, préstamos, tarjetas de crédito y cuentas.',
      askAbout: 'Consulta sobre nuestros servicios bancarios...',
      signIn: 'Iniciar sesión',
      signOut: 'Cerrar sesión',
      darkMode: 'Cambiar tema',
      language: 'Seleccionar idioma',
      assistant: 'Asistente',
      dashboard: 'Panel',
      chatTitle: 'Asistente Bancario',
      initialMessage: '¡Hola! Soy BluBot, tu asistente bancario. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre:\n\n- Tus saldos de cuenta y tarjetas de crédito (requiere inicio de sesión)\n- Tipos de préstamos y sus términos\n- Opciones y beneficios de tarjetas de crédito\n- Diferentes tipos de cuentas bancarias\n- Tipos de cambio actuales\n\nPuedes escribir tu pregunta o hacer clic en el icono del micrófono para hablar.',
      loginRequired: 'Para ver tus saldos de cuenta e información de tarjetas de crédito, por favor inicia sesión primero usando el botón en la esquina superior derecha.',
      accountInfo: 'Aquí están tus saldos de cuenta actuales e información de tarjetas de crédito:',
      loanInfo: 'Ofrecemos varios tipos de préstamos:\n\n1. Préstamos Personales\n- Tasas de interés desde 5.99% TAE\n- Plazos hasta 7 años\n- Sin penalizaciones por pago anticipado\n\n2. Hipotecas\n- Tasas fijas y ajustables\n- Plazos: 15, 20 o 30 años\n- Pagos iniciales desde 3.5%\n\n3. Préstamos para Automóviles\n- Tasas desde 3.99% TAE\n- Plazos hasta 72 meses\n- Vehículos nuevos y usados',
      helpOptions: 'Puedo ayudarte con información sobre:\n- Tus saldos de cuenta y tarjetas de crédito (requiere inicio de sesión)\n- Préstamos (personal, hipoteca, auto)\n- Tarjetas de Crédito (recompensas, viajes, negocios)\n- Cuentas Bancarias (corriente, ahorro, negocios)\n- Tipos de Cambio (actualizaciones diarias)\n\n¿Sobre qué te gustaría saber más?',
      errorMessage: 'Me disculpo, pero encontré un error. Por favor, inténtalo de nuevo.',
    },
  },
  // Add translations for other languages similarly
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;