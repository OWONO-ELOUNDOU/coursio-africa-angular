import { Injectable, inject } from '@angular/core';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    private firestore = inject(Firestore);

    constructor() { }
    
    createTask(task: any, user: any, date: string) {
        return from(setDoc(doc(this.firestore, 'Tasks', `task-${user.uid}`), {
            userId: user.uid,
            email: user.email,
            type: task.type,
            quality: task.quality,
            object: task.object,
            natureJurid: task.natureJurid,
            office: task.office,
            location: task.location,
            description: task.description,
            create_at: date
        }))
    }
}