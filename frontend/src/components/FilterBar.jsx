export default function FilterBar({ setLevel }) {
    return (
        <div className="mb-4">
            <select
                onChange={(e) => setLevel(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="">All Levels</option>
                <option value="INFO">INFO</option>
                <option value="WARN">WARN</option>
                <option value="ERROR">ERROR</option>
                <option value="FATAL">FATAL</option>
            </select>
        </div>
    );
}