import axios from 'axios';

const API_URL = 'http://localhost:5000/retire';

class RetirementService {
    static async getRetirementsByYear(year, type, category) {
        try {
            const params = {};
            if (year) params.year = year;
            if (type) params.type = type;
            if (category) params.category = category;

            const response = await axios.get(`${API_URL}/by-year`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching retirement data:', error);
            throw new Error(error.response?.data?.message || 'Failed to fetch retirement data');
        }
    }
}

export default RetirementService;
