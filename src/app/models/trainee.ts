import { City } from "./city";
export class Trainee {
    trainee_id: string;
    email: string;
    first_name: string;
    last_name: string;
    batch_id: string;
    password: string;
    city_preferences: City[];
    domain_preferences: string[];
}