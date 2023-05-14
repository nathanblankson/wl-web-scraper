const axios = require('axios');

async function fetchHTML(url) {
    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch HTML');
    }
}

module.exports = {
    fetchHTML,
};
