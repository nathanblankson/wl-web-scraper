const axios = require('axios');

const { fetchHTML } = require('../utils/html-utils');

describe('fetchHTML', () => {

    it('should fetch HTML successfully', async () => {
        const mockHTML = '<html><body><h1>Hello, World!</h1></body></html>';

        axios.get = jest.fn();
        axios.get.mockResolvedValue({ data: mockHTML });

        const url = 'https://example.com';
        const html = await fetchHTML(url);

        expect(html).toBe(mockHTML);
        expect(axios.get).toHaveBeenCalledWith(url);
    });

    it('should throw an error when failed to fetch HTML', async () => {
        axios.get = jest.fn();
        axios.get.mockRejectedValue(new Error());

        const url = 'https://example.com';

        await expect(fetchHTML(url)).rejects.toThrow('Failed to fetch HTML');
        expect(axios.get).toHaveBeenCalledWith(url);
    });
});
