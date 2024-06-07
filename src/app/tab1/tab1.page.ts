import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonChip, IonSearchbar, IonFab, IonIcon, IonAvatar, IonFabButton, IonLabel, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonChip, IonSearchbar, IonFab, IonIcon, IonAvatar, IonFabButton, IonLabel, IonSegment, IonSegmentButton]
})
export class Tab1Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
