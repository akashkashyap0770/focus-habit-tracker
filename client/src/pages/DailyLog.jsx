import React from "react";
import { useLog } from "../context/LogContext";
import LogForm from "../components/LogForm";

export default function DailyLog() {
    const { logs, addLog, deleteLog } = useLog();

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Daily Logs</h1>
            <LogForm onAdd={addLog} />
            <div className="space-y-2">
                {logs.map((log) => (
                    <div key={log._id} className="p-2 bg-white shadow rounded flex justify-between">
                        <div>
                            <p><strong>{log.activityName}</strong> ({log.category})</p>
                            <p>{log.duration} min</p>
                        </div>
                        <button onClick={() => deleteLog(log._id)} className="text-red-500 hover:text-red-700">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
