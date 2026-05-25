import { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/logs"
            );

            setLogs(response.data.content || response.data);
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const getLevelColor = (level) => {

        switch(level) {

            case "ERROR":
                return "#ef4444";

            case "WARN":
                return "#f59e0b";

            case "INFO":
                return "#10b981";

            default:
                return "#3b82f6";
        }
    };

    const filteredLogs = logs.filter((log) =>
        log.serviceName.toLowerCase().includes(search.toLowerCase()) ||
        log.message.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            style={{
                background: "#0f172a",
                minHeight: "100vh",
                padding: "30px",
                color: "white",
                fontFamily: "Arial"
            }}
        >

            <h1
                style={{
                    fontSize: "42px",
                    marginBottom: "20px",
                    fontWeight: "bold"
                }}
            >
                LogEngine Dashboard
            </h1>

            {/* STATS */}

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <div style={cardStyle}>
                    <h3>Total Logs</h3>
                    <h1>{logs.length}</h1>
                </div>

                <div style={cardStyle}>
                    <h3>Error Logs</h3>
                    <h1>
                        {
                            logs.filter(log => log.level === "ERROR").length
                        }
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h3>Services</h3>
                    <h1>
                        {
                            new Set(logs.map(log => log.serviceName)).size
                        }
                    </h1>
                </div>

            </div>

            {/* SEARCH */}

            <input
                type="text"
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "none",
                    marginBottom: "25px",
                    fontSize: "16px"
                }}
            />

            {/* TABLE */}

            <div
                style={{
                    overflowX: "auto"
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        background: "#111827",
                        borderRadius: "12px",
                        overflow: "hidden"
                    }}
                >

                    <thead
                        style={{
                            background: "#1e293b"
                        }}
                    >
                    <tr>

                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Service</th>
                        <th style={thStyle}>Level</th>
                        <th style={thStyle}>Message</th>
                        <th style={thStyle}>Timestamp</th>

                    </tr>
                    </thead>

                    <tbody>

                    {
                        loading ? (

                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "30px"
                                    }}
                                >
                                    Loading logs...
                                </td>
                            </tr>

                        ) : (

                            filteredLogs.map((log) => (

                                <tr
                                    key={log.id}
                                    style={{
                                        borderBottom: "1px solid #1e293b"
                                    }}
                                >

                                    <td style={tdStyle}>{log.id}</td>

                                    <td style={tdStyle}>
                                        {log.serviceName}
                                    </td>

                                    <td style={tdStyle}>

                      <span
                          style={{
                              background: getLevelColor(log.level),
                              padding: "6px 12px",
                              borderRadius: "20px",
                              fontWeight: "bold"
                          }}
                      >
                        {log.level}
                      </span>

                                    </td>

                                    <td style={tdStyle}>
                                        {log.message}
                                    </td>

                                    <td style={tdStyle}>
                                        {log.timestamp}
                                    </td>

                                </tr>

                            ))

                        )
                    }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

const cardStyle = {

    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    minWidth: "200px"
};

const thStyle = {

    padding: "16px",
    textAlign: "left",
    fontSize: "18px"
};

const tdStyle = {

    padding: "16px"
};

export default App;