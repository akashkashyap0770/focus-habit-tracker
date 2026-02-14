import React from "react";
import { useLog } from "../context/LogContext";
import HistoryList from "../components/HistoryList";

export default function History() {
    const { logs, deleteLog } = useLog();

    const groupedLogs = logs.reduce((acc, log) => {
        const date = new Date(log.timestamp).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(log);
        return acc;
    }, {});

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">History</h1>
            {Object.keys(groupedLogs).length === 0 && (
                <p className="text-gray-500">No logs yet.</p>
            )}
            {Object.entries(groupedLogs).map(([date, dayLogs]) => (
                <div key={date} className="mb-6">
                    <h2 className="font-semibold mb-2">{date}</h2>
                    <HistoryList logs={dayLogs} onDelete={(id) => deleteLog(id)} />
                </div>
            ))}
        </div>
    );
}
