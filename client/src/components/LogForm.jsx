import React, { useState } from "react";

export default function LogForm({ onAdd }) {
    const [activity, setActivity] = useState("");
    const [category, setCategory] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!activity || !category || !duration) return;
        onAdd({ activity, category, duration: Number(duration) });
        setActivity("");
        setCategory("");
        setDuration("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 p-4 bg-white shadow rounded">
            <input value={activity} onChange={e => setActivity(e.target.value)} placeholder="Activity Name" className="border p-2 rounded" required />
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="border p-2 rounded" required />
            <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration (minutes)" type="number" className="border p-2 rounded" required />
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Add Log</button>
        </form>
    );
}
