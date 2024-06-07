import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirestoreService } from '../common/services/firestore.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class LoginPage implements OnInit {

  showSpinner: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() { }

  async login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    console.log('Email:', email);
    console.log('Password:', password);

    try {
      this.showSpinner = true;

      const result = await this.firestoreService.verifyUser(email, password);
      console.log('Result:', result);

      if (result.success) {
        this.router.navigate(['/home']);
      } else {
        this.showSpinner = false;

        if (result.message === 'email') {
          this.showToast('El correo electrónico es incorrecto.');
        } else if (result.message === 'password') {
          this.showToast('La contraseña es incorrecta.');
        } else {
          this.showToast('Correo electrónico y contraseña son incorrectos.');
        }
      }
    } catch (error) {
      this.showSpinner = false;

      console.error('Error verifying credentials: ', error);
      this.showToast('Error al iniciar sesión. Inténtalo de nuevo.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
