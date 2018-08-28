import {Task} from "./task";
export class Assigned_Task{
    task: Task;
    trainee_id: number;
    competency: string;
    hours_spent: number;
    batch_id: string;
    deadline: Date;
    completed: boolean;
}