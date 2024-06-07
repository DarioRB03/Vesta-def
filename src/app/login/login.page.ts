import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirestoreService } from '../common/services/firestore.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule,
    IonicModule, FormsModule]
})
export class LoginPage implements OnInit {

  showSpinner: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() { }

  async login() {
    const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
    const password = (document.querySelector('input[name="password"]') as HTMLInputElement).value;

    console.log('Email:', email); // Add for debugging
    console.log('Password:', password); // Add for debugging

    try {
      this.showSpinner = true; // Show spinner while verifying user

      const result = await this.firestoreService.verifyUser(email, password);
      console.log('Result:', result); // Add for debugging

      // Check if the user authentication was successful
      if (result.success) {
        // Valid user, navigate to the home page
        this.router.navigate(['/home']);
      } else {
        // Hide spinner if there's an error
        this.showSpinner = false;

        // Show error message based on the reason of failure
        if (result.message === 'email') {
          this.showToast('El correo electrónico es incorrecto.');
        } else if (result.message === 'password') {
          this.showToast('La contraseña es incorrecta.');
        } else {
          this.showToast('Correo electrónico y contraseña son incorrectos.');
        }
      }
    } catch (error) {
      // Hide spinner if there's an error
      this.showSpinner = false;

      // Show generic error message
      console.error('Error verifying credentials: ', error);
      this.showToast('Error al iniciar sesión. Inténtalo de nuevo.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del toast en milisegundos
      position: 'bottom'
    });
    toast.present();
  }
}