import React from "react";
import { useLog } from "../context/LogContext";
import WeeklyChart from "../components/WeeklyChart";

export default function Analytics() {
    const { logs } = useLog();

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            {logs.length === 0 ? <p>No logs found</p> : <WeeklyChart logs={logs} />}
        </div>
    );
}
