import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { objects, qualities, types } from '../../models/services';


@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent {
    typeSelection = types;
    qualitiesSelection = qualities;
    objectSelection = objects;
}