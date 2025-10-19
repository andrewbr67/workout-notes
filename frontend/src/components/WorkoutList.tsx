import type { Workout } from '../types/workout';

export default function WorkoutList({ workouts }: { workouts: Workout[] }) {
    return (
        <div>
            {workouts.map((workout) => (
                <div
                    key={workout.id}
                    style ={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
                >

                    <h3>{workout.title}</h3>
                    <p><strong>Date:</strong> {workout.date ? new Date(workout.date).toLocaleDateString() : "N/A"}</p>
                    <ul>
                        {workout.exercises.map((exercise, index) => (
                            <li key={index}>
                                {exercise.name} - {exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} kg
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

