import { useState } from 'react';
import type { Workout, Exercise } from '../types/workout';

interface WorkoutProps {
    onAdd: (workout: Omit<Workout, "_id">) => void;
}

export default function WorkoutForm({ onAdd }: WorkoutProps) {

    const [title, setTitle] = useState("");
    const [exercises, setExercises] = useState<Exercise[]>([
        { name: '', sets: 0, reps: 0, weight: 0 }
    ]);

    const handleExerciseChange = (index : number, field: keyof Exercise, value: string | number ) => {
        const newExercises = [...exercises];
        (newExercises[index][field] as string | number) = typeof value === "string" ? value : Number(value);
        //newExercises[index][field] = typeof value === "string" ? value : Number(value);
        setExercises(newExercises);
    }

    const addExercise = () => setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0 }]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return alert('Please enter a workout title.');
        onAdd({ title, exercises });
        setTitle("");
        setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Workout</h3>
            <input
                type="text"
                placeholder="Workout Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {exercises.map((exercise, index) => (
                <div key={index}>
                    <input
                        placeholder = "Exercise Name"
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder = "Sets"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder = "Reps"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder = "Weight (kg)"
                        value={exercise.weight}
                        onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                    />
                </div>
            ))}

            <button type="button" onClick={addExercise}>Add Exercise</button>
            <button type="submit">Add Workout</button>
        </form>
    );
}