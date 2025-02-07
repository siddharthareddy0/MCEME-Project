// attendanceStore.js
import { create } from 'zustand';

const useAttendanceStore = create((set) => ({
  // Initial data structure for all faculties
  attendanceData: {
    "Budget Cell": [],
    "FAE": [],
    "HQ Trg Wing": [],
    "HQ Coy": [],
    "MTS": [],
    "SDD": [],
    "FEMT": [],
    "Col Adm Sectt": [],
    "FEME": [],
    "JCO Mess": [],
    "Offr Mess": [],
    "CTW": [],
    "Mag 5": [],
    "EMESA": [],
    "FDE": [],
    "Comdt Sectt": [],
    "SM Br": [],
    "FEL": [ 
      { id: "BC001", name: "John Smith", date: "2025-02-07", status: "Present", timeIn: "09:00", timeOut: "17:00" },
      { id: "BC002", name: "Sarah Johnson", date: "2025-02-07", status: "Present", timeIn: "08:45", timeOut: "17:15" }
    ],
    "A Coy": [],
    "Fin Sec": [],
    "Est Civ Sec": [],
    "Adjt Sec": [],
    "E Coy": [],
    "MTO": [],
    "QM Sec": [],
    "QM Fire Stn": [],
    "MCEME Liby": [],
    "AA&QMG": [],
    "Est (O) Civ Sec": [],
    "BSO": []
  },

  // Function to update attendance for a specific faculty and ID
  updateAttendance: (faculty, id, updates) => 
    set((state) => ({
      attendanceData: {
        ...state.attendanceData,
        [faculty]: (state.attendanceData[faculty] || []).map(row =>
          row.id === id ? { ...row, ...updates } : row
        )
      }
    }))
}));

export default useAttendanceStore;
