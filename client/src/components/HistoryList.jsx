import React from "react";

export default function HistoryList({ logs, onDelete }) {
    return (
        <div className="space-y-2">
            {logs.map((log) => (
                <div key={log._id} className="p-2 bg-white shadow rounded flex justify-between">
                    <div>
                        <p>
                            <strong>{log.activityName}</strong> ({log.category})
                        </p>
                        <p>{log.duration} min</p>
                    </div>
                    <button
                        onClick={() => onDelete(log._id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
