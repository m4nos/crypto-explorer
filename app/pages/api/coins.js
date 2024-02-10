import axios from 'axios';

const coinsApi = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/api/coins', {
            params: req.query
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default coinsApi;