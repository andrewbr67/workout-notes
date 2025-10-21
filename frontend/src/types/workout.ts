export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    weight: number; // in kilograms
}

export interface Workout {
    _id: string;
    title?: string;
    date?: string; // ISO date string
    exercises: Exercise[];
}