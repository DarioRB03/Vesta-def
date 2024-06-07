import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonModal, IonItem, IonLabel, IonList, IonListHeader, IonCheckbox, IonButton } from '@ionic/angular/standalone';
import { FirestoreService } from '../common/services/firestore.service';
import { ModalController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-routine-modal',
  templateUrl: './add-routine-modal.page.html',
  styleUrls: ['./add-routine-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonModal, IonItem, IonLabel, IonList, IonListHeader, IonCheckbox, IonButton],
  providers: [ModalController]
})
export class AddRoutineModalPage implements OnInit {

  routineName: string = '';
  predefinedItems: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  selectedItems: string[] = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }

  selectItem(item: string) {
    if (this.selectedItems.includes(item)) {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    } else {
      this.selectedItems.push(item);
    }
    console.log('Selected Items:', this.selectedItems);
  }

  confirmSelection() {
    console.log('Confirmed Selected Items:', this.selectedItems);
    this.closeModal();
  }
}

