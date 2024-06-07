import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, getDoc, setDoc, updateDoc, deleteDoc, DocumentReference, query, where, getDocs } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { Routine } from '../models/routine.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore: Firestore = inject(Firestore);

  constructor() { }


  createIdDoc() {
    return uuidv4();
  }

  createDocumentID(data: any, collectionPath: string, docId: string): Promise<void> {
    const documentRef = doc(this.firestore, collectionPath, docId);
    return setDoc(documentRef, data);
  }

  // Autenticación de usuarios
  async registerUser(email: string, password: string): Promise<{ success: boolean, message?: string }> {
    try {
      // Comprobar si el usuario ya está registrado
      const userQuery = query(collection(this.firestore, 'Usuarios'), where('email', '==', email));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        return { success: false, message: 'El usuario ya está registrado.' };
      }

      // Registrar al usuario en Firestore
      const userId = uuidv4();
      const userRef = doc(this.firestore, 'Usuarios', userId);
      await setDoc(userRef, { email, password });

      return { success: true };
    } catch (error) {
      console.error('Error registrando usuario:', error);
      return { success: false, message: 'Error al registrar el usuario. Por favor, inténtelo de nuevo.' };
    }
  }

  async verifyUser(email: string, password: string): Promise<{ success: boolean, userId?: string, message?: string }> {
    try {
      const userQuery = query(collection(this.firestore, 'Usuarios'), where('email', '==', email));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        return { success: false, message: 'El correo electrónico no está registrado.' };
      }

      const userData = userSnapshot.docs[0].data();

      if (userData['password'] !== password) {
        return { success: false, message: 'La contraseña es incorrecta.' };
      }

      return { success: true, userId: userSnapshot.docs[0].id };
    } catch (error) {
      console.error('Error verificando usuario:', error);
      return { success: false, message: 'Error al verificar el usuario. Por favor, inténtelo de nuevo.' };
    }
  }

}

