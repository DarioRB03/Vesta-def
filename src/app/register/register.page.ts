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
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

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
      const userId = this.firestoreService.createIdDoc();
      const createdAt = new Date();

      this.newUser.userId = userId;
      this.newUser.createdAt = createdAt;

      const userData = {
        userId: this.newUser.userId,
        nombre: this.newUser.username,
        email: this.newUser.email,
        password: this.newUser.password,
        createdAt: this.newUser.createdAt
      };

      await this.firestoreService.createDocumentID(userData, 'Usuarios', userId);
      console.log("Document saved successfully");
      this.initUser();
      form.resetForm();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error saving document: ", error);
    } finally {
      this.cargando = false;
    }
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
