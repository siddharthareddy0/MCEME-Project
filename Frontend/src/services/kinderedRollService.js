import axios from "axios";

const API_URL = "http://localhost:5000/kinderedroll";

const kinderedRollService = {
  submitForm: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/submit`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw new Error("Form submission failed");
    }
  },

  getAllRecords: async () => {
    try {
      const response = await axios.get(`${API_URL}/records`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return []; // Return empty array if no records found
      }
      throw error;
    }
  },

  getRecordById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/records/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching record:", error);
      throw error;
    }
  },

  getDetailedRecordByPotNo: async (pot_no) => {
    try {
      const response = await axios.get(`${API_URL}/records/${pot_no}/details`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching detailed record:", error);
      throw error;
    }
  },

  updateStatus: async (pot_no, status) => {
    if (!pot_no) throw new Error("Record ID is required");
    console.log('Attempting to update status:', { pot_no, status }); // Debug log
    
    try {
      const response = await axios.patch(
        `${API_URL}/records/${pot_no}/status`,
        { status },  // Simplified payload
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Status update error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.status === 404) {
        throw new Error(`Record with POT number ${pot_no} not found`);
      }
      throw new Error(`Failed to update status: ${error.message}`);
    }
  }
};

export default kinderedRollService;
