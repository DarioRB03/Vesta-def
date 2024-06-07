import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonChip, IonSearchbar, IonFab, IonIcon, IonAvatar, IonFabButton, IonLabel, IonSegment, IonSegmentButton, IonList, IonItem, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from '../common/services/firestore.service';
import { Routine } from '../common/models/routine.model';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonChip, IonSearchbar, IonFab, IonIcon, IonAvatar, IonFabButton, IonLabel, IonSegment, IonSegmentButton, IonList, IonItem, IonCard, IonCardHeader, IonCardContent, IonCardTitle],
  providers: [ModalController]
})
export class Tab2Page implements OnInit {



  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
  }

}
