import axios from 'axios';

const coinDetailsApi = async (req, res) => {
    try {
        const { id } = req.query;
        const response = await axios.get(`http://localhost:5000/api/coins/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Coin not found' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default coinDetailsApi;