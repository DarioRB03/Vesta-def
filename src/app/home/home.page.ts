import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonCard, IonInput, IonButton,
  IonSpinner, IonTabs, IonTabBar, IonIcon, IonTabButton,
} from '@ionic/angular/standalone';
import { FirestoreService } from '../common/services/firestore.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCard, IonInput,
    IonButton, IonSpinner, IonTabs, IonTabBar, IonIcon, IonTabButton,
  ],
})
export class HomePage implements OnInit {



  constructor(private firestoreService: FirestoreService) {
  }

  ngOnInit() {
  }

}
