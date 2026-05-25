export default function LogTable({ logs }) {
    return (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Message</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Level</th>
                    <th className="p-3">Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {logs.map((log) => (
                    <tr key={log.id} className="border-b">
                        <td className="p-3">{log.id}</td>
                        <td className="p-3">{log.message}</td>
                        <td className="p-3">{log.serviceName}</td>
                        <td className="p-3">{log.level}</td>
                        <td className="p-3">{log.timestamp}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}