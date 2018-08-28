import { Assigned_Task } from './assignedTask';
import { Trainee } from './trainee';
export class Batch {
    batch_id: string;
    startDate: Date;
    assigned_tasks: Assigned_Task[];
    trainees: Trainee[];
  }