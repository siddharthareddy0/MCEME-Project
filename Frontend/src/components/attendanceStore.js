// attendanceStore.js
import { create } from 'zustand';

const useAttendanceStore = create((set) => ({
  // Initial data structure for all faculties
  attendanceData: {
    "HQ Adm Wg": {
      isParent: true,
      subFaculties: {
        "HQ Adm Wg": [
          { id: "HQC001", name: "nani", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "HQC002", name: "sathwik", tradeFac: "JCO", status: "Present", remarks: "" },
          { id: "HQC003", name: "charith", tradeFac: "OR", status: "Leave", remarks: "Annual Leave" }
        ],
        "HQ Coy": [
          { id: "HQC001", name: "Maj S Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "HQC002", name: "Sub Maj R Singh", tradeFac: "JCO", status: "Present", remarks: "" },
          { id: "HQC003", name: "Hav D Prasad", tradeFac: "OR", status: "Leave", remarks: "Annual Leave" }
        ],
        "Col Adm Sectt": [
          { id: "CAS001", name: "Col A Sharma", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "CAS002", name: "Nb Sub P Kumar", tradeFac: "JCO", status: "Present", remarks: "" },
          { id: "CAS003", name: "NK M Singh", tradeFac: "OR", status: "W/Off", remarks: "" }
        ],
        "JCO Mess": [
          { id: "JCO001", name: "Sub B Kumar", tradeFac: "JCO", status: "Present", remarks: "" },
          { id: "JCO002", name: "Hav G Singh", tradeFac: "OR", status: "Present", remarks: "" }
        ],
        "Offr Mess": [
          { id: "OFF001", name: "Maj P Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "OFF002", name: "Sub K Singh", tradeFac: "JCO", status: "Present", remarks: "" }
        ],
        "Est Civ Sec": [
          { id: "ECS001", name: "Mr. R Kumar", tradeFac: "Civilian", status: "Present", remarks: "" },
          { id: "ECS002", name: "Mrs. S Devi", tradeFac: "Civilian", status: "Leave", remarks: "Medical Leave" }
        ],
        "Adjt Sec": [
          { id: "ADJ001", name: "Maj N Rao", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "ADJ002", name: "Nb Sub V Kumar", tradeFac: "JCO", status: "Present", remarks: "" }
        ],
        "QM Sec": [
          { id: "QMS001", name: "Capt L Singh", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "QMS002", name: "Sub R Kumar", tradeFac: "JCO", status: "Present", remarks: "" }
        ],
        "QM Fire Stn": [
          { id: "QMF001", name: "Nb Sub D Singh", tradeFac: "JCO", status: "Present", remarks: "" },
          { id: "QMF002", name: "Hav P Kumar", tradeFac: "OR", status: "Present", remarks: "" }
        ],
        "AA&QMG": [
          { id: "AAQ001", name: "Col S Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "AAQ002", name: "Sub Maj K Singh", tradeFac: "JCO", status: "Present", remarks: "" }
        ],
        "Est (O) Civ Sec": [
          { id: "EOC001", name: "Mr. A Kumar", tradeFac: "Civilian", status: "Present", remarks: "" },
          { id: "EOC002", name: "Mrs. P Rani", tradeFac: "Civilian", status: "Present", remarks: "" }
        ],
        "BSO": [
          { id: "BSO001", name: "Maj H Singh", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "BSO002", name: "Nb Sub T Kumar", tradeFac: "JCO", status: "Present", remarks: "" }
        ]
      }
    },
    "Budget Cell": [
      { id: "BC001", name: "Maj R Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "BC002", name: "Sub S Singh", tradeFac: "JCO", status: "Present", remarks: "" },
      { id: "BC003", name: "Mr. K Rao", tradeFac: "Civilian", status: "Present", remarks: "" }
    ],
    "FAE": [
      { id: "FAE001", name: "Lt Col M Singh", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FAE002", name: "Maj P Kumar", tradeFac: "Officer", status: "Leave", remarks: "Course" },
      { id: "FAE003", name: "Sub N Singh", tradeFac: "JCO", status: "Present", remarks: "" }
    ],
    "HQ Trg Wing": {
      isParent: true,
      subFaculties: {
        "CTW": [
          { id: "CTW001", name: "Col D Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "CTW002", name: "Maj L Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "CTW003", name: "Sub Maj B Singh", tradeFac: "JCO", status: "Present", remarks: "" }
        ],
        "MTS": [
          { id: "MTS001", name: "Lt Col R Singh", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "MTS002", name: "Maj K Kumar", tradeFac: "Officer", status: "W/Off", remarks: "" },
          { id: "MTS003", name: "Sub S Singh", tradeFac: "JCO", status: "Present", remarks: "" }
        ],
        "SDD": [
          { id: "SDD001", name: "Maj Y Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "SDD002", name: "Capt P Singh", tradeFac: "Officer", status: "Present", remarks: "" },
          { id: "SDD003", name: "Sub H Kumar", tradeFac: "JCO", status: "Leave", remarks: "Annual Leave" }
        ]
      }
    },
    "FEMT": [
      { id: "FMT001", name: "Col G Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FMT002", name: "Maj T Singh", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FMT003", name: "Sub R Kumar", tradeFac: "JCO", status: "Present", remarks: "" }
    ],
    "FEME": [
      { id: "FME001", name: "Lt Col P Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FME002", name: "Maj S Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FME003", name: "Sub Maj D Singh", tradeFac: "JCO", status: "Present", remarks: "" }
    ],
    "Mag 5": [
      { id: "MG5001", name: "Maj K Singh", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "MG5002", name: "Sub L Kumar", tradeFac: "JCO", status: "Present", remarks: "" },
      { id: "MG5003", name: "Hav M Singh", tradeFac: "OR", status: "Present", remarks: "" }
    ],
    "EMESA": [
      { id: "EMS001", name: "Col R Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "EMS002", name: "Maj N Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "EMS003", name: "Sub B Singh", tradeFac: "JCO", status: "W/Off", remarks: "" }
    ],
    "FDE": [
      { id: "FDE001", name: "Lt Col S Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FDE002", name: "Maj H Singh", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FDE003", name: "Sub P Kumar", tradeFac: "JCO", status: "Present", remarks: "" }
    ],
    "Comdt Sectt": [
      { id: "CMD001", name: "Col V Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "CMD002", name: "Sub Maj J Singh", tradeFac: "JCO", status: "Present", remarks: "" },
      { id: "CMD003", name: "Hav K Kumar", tradeFac: "OR", status: "Present", remarks: "" }
    ],
    "SM Br": [
      { id: "SMB001", name: "Maj L Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "SMB002", name: "Sub R Singh", tradeFac: "JCO", status: "Present", remarks: "" },
      { id: "SMB003", name: "NK P Kumar", tradeFac: "OR", status: "Leave", remarks: "Casual Leave" }
    ],
    "FEL": [
      { id: "FEL001", name: "Lt Col M Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FEL002", name: "Maj D Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FEL003", name: "Sub Q Singh", tradeFac: "JCO", status: "Present", remarks: "" }
    ],
    "A Coy": [
      { id: "ACY001", name: "Maj F Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "ACY002", name: "Sub W Singh", tradeFac: "JCO", status: "Present", remarks: "" },
      { id: "ACY003", name: "Hav E Kumar", tradeFac: "OR", status: "Present", remarks: "" }
    ],
    "Fin Sec": [
      { id: "FIN001", name: "Lt Col C Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "FIN002", name: "Sub U Singh", tradeFac: "JCO", status: "W/Off", remarks: "" },
      { id: "FIN003", name: "Mr. O Kumar", tradeFac: "Civilian", status: "Present", remarks: "" }
    ],
    "E Coy": [
      { id: "ECY001", name: "Maj I Kumar", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "ECY002", name: "Sub X Singh", tradeFac: "JCO", status: "Present", remarks: "" },
      { id: "ECY003", name: "Hav Z Kumar", tradeFac: "OR", status: "Leave", remarks: "Medical Leave" }
    ],
    "MTO": [
      { id: "MTO001", name: "Maj J Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "MTO002", name: "Sub Y Singh", tradeFac: "JCO", status: "Present", remarks: "" },
      { id: "MTO003", name: "NK A Kumar", tradeFac: "OR", status: "Present", remarks: "" }
    ],
    "MCEME Liby": [
      { id: "LIB001", name: "Capt B Reddy", tradeFac: "Officer", status: "Present", remarks: "" },
      { id: "LIB002", name: "Mr. V Kumar", tradeFac: "Civilian", status: "Present", remarks: "" },
      { id: "LIB003", name: "Mrs. T Devi", tradeFac: "Civilian", status: "Present", remarks: "" }
    ]
  },

  // Function to update attendance for a specific faculty and ID
  updateAttendance: (faculty, subFaculty, id, updates) => 
    set((state) => {
      const newState = { ...state.attendanceData };
      if (newState[faculty].isParent) {
        newState[faculty].subFaculties[subFaculty] = newState[faculty].subFaculties[subFaculty].map(row =>
          row.id === id ? { ...row, ...updates } : row
        );
      } else {
        newState[faculty] = newState[faculty].map(row =>
          row.id === id ? { ...row, ...updates } : row
        );
      }
      return { attendanceData: newState };
    })
}));

export default useAttendanceStore;
