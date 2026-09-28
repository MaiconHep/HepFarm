import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Configuração mockada para o emulador local
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-fazenda-modelo.firebaseapp.com",
  projectId: "demo-fazenda-modelo",
  storageBucket: "demo-fazenda-modelo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Conecta aos emuladores se estiver em ambiente de desenvolvimento
if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectStorageEmulator(storage, 'localhost', 9199);
  console.log("🔥 Firebase conectado aos Emuladores Locais");
}

export { app, db, auth, storage };
