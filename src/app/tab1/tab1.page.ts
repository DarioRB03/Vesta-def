import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { IonContent, IonHeader, IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton, FormsModule]

})
export class Tab1Page implements OnInit {
  @ViewChild('exerciseChart', { static: true }) exerciseChart: ElementRef;
  exerciseData: any = [];
  exercise: { weight: number, reps: number } = { weight: 0, reps: 0 }; // Define la propiedad exercise

  constructor() { }

  ngOnInit() {
    this.generateChart();
  }

  generateChart() {
    const ctx = this.exerciseChart.nativeElement.getContext('2d');
    const exerciseChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [{
          label: 'Progresión del Ejercicio',
          data: this.exerciseData,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          ticks: {
            beginAtZero: true as boolean
          }
        }
      }
    });
  }

  calculateMaxReps() {
    // Implementa el cálculo de la repetición máxima aquí
    const maxReps = this.exercise.reps * (1 + (this.exercise.weight * 0.0333)); // Fórmula de Brzycki
    return maxReps;
  }

  saveExercise(form: { value: { weight: any; reps: any; }; }) {
    // Aquí podrías recopilar los datos del formulario y asignarlos a la propiedad exercise
    this.exercise = { weight: form.value.weight, reps: form.value.reps };
    // Luego, podrías generar la gráfica con los nuevos datos del ejercicio
    this.generateChart();
  }
}
