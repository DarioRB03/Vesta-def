import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonHeader, IonSpinner, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonCard, IonInput, IonButton, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirestoreService } from '../common/services/firestore.service';
import { User } from '../common/models/user.models';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonCard, IonInput, IonButton, IonCardContent, FormsModule, CommonModule, IonSpinner, FormsModule, IonIcon]
})
export class RegisterPage implements OnInit {

  newUser: User;
  cargando: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.initUser();
  }

  ngOnInit() {
  }

  initUser() {
    this.newUser = new User('', '', '', '', new Date());
  }

  async save(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.cargando = true;
    try {
      const userId = this.firestoreService.createIdDoc(); // Generamos un ID único
      const createdAt = new Date(); // Obtener la fecha y hora actual

      this.newUser.userId = userId; // Asignamos el ID generado al usuario
      this.newUser.createdAt = createdAt; // Asignamos la fecha y hora de creación al usuario

      // Convertir el objeto User a un objeto plano
      const userData = {
        userId: this.newUser.userId,
        nombre: this.newUser.username,
        email: this.newUser.email,
        password: this.newUser.password,
        createdAt: this.newUser.createdAt // Asegúrate de incluir createdAt en el userData
      };

      await this.firestoreService.createDocumentID(userData, 'Usuarios', userId);
      console.log("Document saved successfully");
      // Reiniciar el formulario
      this.initUser();
      form.resetForm();
      // Redirigir al usuario a la página de inicio de sesión u otra página después del registro
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error saving document: ", error);
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
    } finally {
      this.cargando = false;
    }
  }
}
