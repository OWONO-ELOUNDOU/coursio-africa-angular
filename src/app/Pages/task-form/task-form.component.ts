import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Import Models
import { objects, qualities, types } from '../../models/services';

// Import Services
import { TaskService } from '../../services/tasks/tasks.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent {
  private route = inject(Router);
  private taskService = inject(TaskService);
  private toastService = inject(HotToastService);

  typeSelection = types;
  qualitiesSelection = qualities;
  objectSelection = objects;

  selectedType: string = '';
  selectedQuality: string = '';
  selectedObject: string = '';
  today = new Date().toISOString().split('T')[0];

  TaskForm = new FormGroup({
    type: new FormControl('', Validators.required),
    quality: new FormControl('', Validators.required),
    object: new FormControl('', Validators.required),
    natureJurid: new FormControl('', Validators.required),
    office: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  constructor() {
  }

  selectType(e: any) {
    this.selectedType = e.target.value;
  }
  selectQuality(e: any) {
    this.selectedQuality = e.target.value;
  }
  selectObject(e: any) {
    this.selectedObject = e.target.value;
  }

  onSubmit() {
    if (!this.TaskForm.valid) this.TaskForm.markAllAsTouched;

    this.TaskForm.patchValue({
      type: this.selectedType,
      quality: this.selectedQuality,
      object: this.selectedObject,
    });
    console.table(this.TaskForm.value);

    try {
      this.taskService.createTask(this.TaskForm.value, { uid: 'eUUOI3QRKSXBiVnZrxmSG2jnhsy1', email: 'user01@gmail.com' }, this.today).pipe(
        this.toastService.observe({
          success: 'Demande envoyée',
          loading: 'Enregistrement',
          error: 'Echec envoi'
        })
      ).subscribe(() => {
        this.route.navigate(['/checkout']);
        localStorage.setItem('task', JSON.stringify(this.TaskForm.value));
      }, (error) => this.toastService.error(error.message));
    } catch (error) {
      this.toastService.error('Une erreur est survenue');
    }
  }
}
