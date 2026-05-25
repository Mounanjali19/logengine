import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import API from "../services/api";
import StatsCard from "../components/StatsCard";
import FilterBar from "../components/FilterBar";
import LogTable from "../components/LogTable";

export default function Dashboard() {
    const [logs, setLogs] = useState([]);
    const [level, setLevel] = useState("");
    const [page, setPage] = useState(0);

    // Fetch logs
    useEffect(() => {
        fetchLogs();
    }, [level, page]);

    const fetchLogs = async () => {
        try {
            let url = `/logs?page=${page}&size=5`;

            if (level) {
                url = `/logs/level/${level}`;
            }

            const response = await API.get(url);

            if (level) {
                setLogs(response.data);
            } else {
                setLogs(response.data.content);
            }
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    };

    // WebSocket connection
    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/logs", (message) => {
                const newLog = JSON.parse(message.body);

                setLogs((prevLogs) => [newLog, ...prevLogs]);
            });
        });

        // Cleanup on component unmount
        return () => {
            if (stompClient.connected) {
                stompClient.disconnect(() => {
                    console.log("Disconnected");
                });
            }
        };
    }, []);

    const errorCount = logs.filter(
        (log) => log.level === "ERROR"
    ).length;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-6">
                LogEngine Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatsCard title="Total Logs" value={logs.length} />
                <StatsCard title="Error Logs" value={errorCount} />
                <StatsCard title="Live Monitoring" value="ACTIVE" />
            </div>

            <FilterBar setLevel={setLevel} />

            <LogTable logs={logs} />

            {!level && (
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        disabled={page === 0}
                        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}