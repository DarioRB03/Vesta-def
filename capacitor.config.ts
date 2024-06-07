import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Vesta-def',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      resize: 'ionic', // Puede ser 'body', 'native', o 'none'
      style: 'light',  // Estilos de teclado
      resizeOnFullScreen: true // Ajustar cuando está en pantalla completa
    },
  },
};
export default config;
