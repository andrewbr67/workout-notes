import { useState } from 'react';
import type { Workout, Exercise } from '../types/workout';

// Define the props for the WorkoutForm component
// onAdd is a function that takes a workout object (without the _id) and returns void

interface WorkoutProps {
    onAdd: (workout: Omit<Workout, "_id">) => void;
}

export default function WorkoutForm({ onAdd }: WorkoutProps) {

    // State for workout title and list of exercises
    // Each exercise has name, sets, reps, and weight

    const [title, setTitle] = useState("");
    const [exercises, setExercises] = useState<Exercise[]>([
        { name: '', sets: 0, reps: 0, weight: 0 }
    ]);


    // Update the specific field of the exercise at the given index

    const handleExerciseChange = (index : number, field: keyof Exercise, value: string | number ) => {
        const newExercises = [...exercises];
        (newExercises[index][field] as string | number) = typeof value === "string" ? value : Number(value);
        //newExercises[index][field] = typeof value === "string" ? value : Number(value);
        setExercises(newExercises);
    }

    const addExercise = () => setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0 }]);

    // Handle form submission
    // Validate title and exercises and call onAdd with the new workout data

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return alert('Please enter a workout title.');
        if (exercises.length === 0) return alert('Please add at least one exercise.');
        for (const exercise of exercises) {
            if (!exercise.name.trim()) return alert('Please enter a name for all exercises.');
        }
        onAdd({ title, exercises });
        setTitle("");
        setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }]);
    };

    // Render the workout form
    // Input for title and dynamic inputs for each exercise
    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Workout</h3>
            <input
                type="text"
                placeholder="Workout Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {/* Render inputs for each exercise */}
            {/* Map over exercises and create inputs for name, sets, reps, and weight */}
            {exercises.map((exercise, index) => (
                <div key={index}>
                    <input
                        placeholder = "Exercise Name"
                        value={exercise.name}
                        // Update the name of the exercise
                        // Call handleExerciseChange with index, 'name', and new value
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