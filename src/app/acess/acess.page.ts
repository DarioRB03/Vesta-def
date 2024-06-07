import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonCard, IonInput, IonButton, IonCardContent, ToastController } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-acess',
  templateUrl: './acess.page.html',
  styleUrls: ['./acess.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonCard, IonInput, IonButton, IonCardContent, FormsModule, CommonModule, RouterModule]
})
export class AcessPage implements OnInit {

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

}
