// import React, { useState, useEffect } from 'react';
// import { Clock, CheckCircle, AlertCircle, TrendingUp, Loader2 } from 'lucide-react';
// import api from '../../services/api'; 

// const EmployeeDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/attendance/summary'); 
//         setStats(response.data);
//         setError(null);
//       } catch (err) {
//         setError("Could not load dashboard data.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
//         <p className="text-gray-500 font-medium">Loading your productivity stats...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//         <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-red-100">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-bold text-gray-800">Oops!</h2>
//           <p className="text-gray-500 mt-2">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const circleCircumference = 552.9;
//   const progressOffset = circleCircumference - (circleCircumference * (Math.min(stats.todayHours, 8) / 8));

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <header className="mb-8 flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-extrabold text-gray-900">My Productivity</h1>
//           <p className="text-gray-500">Real-time tracking for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
//         </div>
//         <div className="text-right">
//             <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
//                 Live Data
//             </span>
//         </div>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
//           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Today's Progress</h3>
          
//           <div className="relative w-48 h-48 flex items-center justify-center">
//             <svg className="absolute w-full h-full transform -rotate-90">
//               <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
//               <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
//                 strokeDasharray={circleCircumference}
//                 strokeDashoffset={progressOffset} 
//                 className={`${stats.todayHours >= 8 ? 'text-green-500' : 'text-blue-600'} transition-all duration-1000 ease-out`}
//                 strokeLinecap="round"
//               />
//             </svg>
//             <div className="flex flex-col items-center">
//               <span className="text-4xl font-black text-gray-800">{stats.todayHours}h</span>
//               <span className="text-[10px] text-gray-400 font-bold uppercase">of 8h Goal</span>
//             </div>
//           </div>

//           <p className="mt-8 text-sm text-gray-600 font-medium">
//             {stats.todayHours < 8 
//               ? `Working... ${8 - stats.todayHours}h left for a Valid Day` 
//               : "Excellent! You've cleared the 8h requirement."}
//           </p>
//         </div>

//         <div className="lg:col-span-2 space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
//               <div className="relative z-10">
//                 <TrendingUp className="text-blue-400 mb-4" size={28} />
//                 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Net Balance</p>
//                 <h3 className={`text-4xl font-black mt-1 ${stats.balance >= 0 ? 'text-white' : 'text-red-400'}`}>
//                     {stats.balance > 0 ? `+${stats.balance}` : stats.balance}h
//                 </h3>
//                 <p className="text-slate-400 text-[10px] mt-2 italic">*Based on 9h daily target</p>
//               </div>
//               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
//             </div>

//             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//               <CheckCircle className="text-green-500 mb-4" size={28} />
//               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Valid Days</p>
//               <h3 className="text-4xl font-black text-gray-800 mt-1">{stats.validDays}</h3>
//               <p className="text-gray-400 text-[10px] mt-2">Month to Date Total</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//              <div className="flex justify-between items-center mb-6">
//                <h3 className="font-bold text-gray-800">Recent Sessions</h3>
//                <button className="text-blue-600 text-xs font-bold hover:underline">View History</button>
//              </div>
//              <div className="space-y-4">
//                 {stats.recentLogs.map((log, i) => (
//                   <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-2 h-2 rounded-full ${log.isValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                       <span className="text-sm font-semibold text-gray-700">{log.date}</span>
//                     </div>
//                     <div className="flex items-center gap-6">
//                       <span className="text-sm font-bold text-gray-800">{log.totalHours}h</span>
//                       <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${log.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                         {log.isValid ? 'Valid' : 'Invalid'}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;


import React from 'react';
import { Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const EmployeeDashboard = () => {
  // These would eventually come from your Backend API
  const stats = {
    balance: "+2.5",
    validDays: 18,
    monthProgress: 75,
    todayHours: 7.5,
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Productivity</h1>
        <p className="text-gray-500">Track your hours and monthly balance targets.</p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LIVE PROGRESS CIRCLE */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Today's Progress</h3>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
              {/* Progress Circle */}
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                strokeDasharray={552.9}
                strokeDashoffset={552.9 - (552.9 * (stats.todayHours / 8))} 
                className="text-blue-600 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-gray-800">{stats.todayHours}h</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">of 8h Goal</span>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-600 font-medium">
            {stats.todayHours < 8 
              ? `Finish in ${8 - stats.todayHours}h for a Valid Day` 
              : "Goal Reached! Day is Valid."}
          </p>
        </div>

        {/* STATS AND SUMMARY */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Monthly Balance Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <TrendingUp className="text-blue-400 mb-4" size={28} />
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Monthly Balance</p>
                <h3 className="text-4xl font-black mt-1">{stats.balance}h</h3>
                <p className="text-slate-400 text-[10px] mt-2 italic">*Target: 9h/day average</p>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* Valid Days Card */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <CheckCircle className="text-green-500 mb-4" size={28} />
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Valid Days</p>
              <h3 className="text-4xl font-black text-gray-800 mt-1">{stats.validDays}</h3>
              <p className="text-gray-400 text-[10px] mt-2">Current Month Achievement</p>
            </div>
          </div>

          {/* RECENT ACTIVITY PREVIEW */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-800">Recent Logs</h3>
               <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
             </div>
             <div className="space-y-4">
                {[
                  { date: "Yesterday", hours: 9.5, status: "Valid" },
                  { date: "22 Dec", hours: 7.2, status: "Invalid" }
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${log.status === 'Valid' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-semibold text-gray-700">{log.date}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-bold text-gray-800">{log.hours}h</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${log.status === 'Valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;   