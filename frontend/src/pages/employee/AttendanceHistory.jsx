// AttendanceHistory.jsx
const History = () => {
  const [history, setHistory] = useState([]);

  // Backend nundi data techukovali
  useEffect(() => {
    const fetchHistory = async () => {
      const res = await api.get("/attendance/my-history");
      setHistory(res.data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">My Attendance History</h3>
      <div className="grid gap-4">
        {history.map((record) => (
          <div key={record._id} className="flex items-center p-3 bg-white shadow rounded-lg">
            {/* Cloudinary Image ni ikkada display chestham */}
            <img 
              src={record.imageUrl} 
              alt="attendance" 
              className="w-16 h-16 rounded-md object-cover mr-4 border" 
            />
            <div>
              <p className="font-semibold text-gray-800">{record.type} - {record.status}</p>
              <p className="text-xs text-gray-500">{new Date(record.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};