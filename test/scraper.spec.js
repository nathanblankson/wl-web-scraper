const axios = require('axios');

const { parsePackageData, getPackageData } = require('../scraper');

jest.mock('axios');

describe('parsePackageData', () => {

	it('should parse package data from HTML', () => {
		const mockHTML = `
		<html>
			<body>
			<div class="package">
				<h3>Package 1 - 12 Months</h3>
				<div class="package-description">Description 1</div>
				<div class="price-big">£2.99</div>
			</div>
			<div class="package">
				<h3>Package 2 - 1 Year</h3>
				<div class="package-description">Description 2</div>
				<div class="price-big">£10.99</div>
				<div class="package-price">
					<p>10% off</p>
				</div>
			</div>
			<div class="package">
				<h3>Package 3 - 12 Months</h3>
				<div class="package-description">Description 3</div>
				<div class="price-big">£20.99</div>
			</div>
			</body>
		</html>`;

		const expectedPackageData = [
			{
				optionTitle: 'Package 3 - 12 Months',
				description: 'Description 3',
				price: 20.99,
				discount: null,
			},
			{
				optionTitle: 'Package 1 - 12 Months',
				description: 'Description 1',
				price: 2.99,
				discount: null
			},
			{
				optionTitle: 'Package 2 - 1 Year',
				description: 'Description 2',
				price: 10.99,
				discount: '10% off',
			},
		];

		const packageData = parsePackageData(mockHTML);

		expect(packageData).toEqual(expectedPackageData);
	});
});

describe('getPackageData', () => {

	it('should fetch and parse package data', async () => {
		const mockHTML = '<html><body><div class="package"></div></body></html>';
		const expectedPackageData = [{ optionTitle: '', description: '', price: NaN, discount: null }];

		axios.get = jest.fn();
		axios.get.mockResolvedValue({ data: mockHTML });

		const packageData = await getPackageData();

		expect(packageData).toEqual(expectedPackageData);
		expect(axios.get).toHaveBeenCalledWith('https://wltest.dns-systems.net/');
	});

	it('should throw an error when failed to fetch package data', async () => {
		axios.get = jest.fn();
		axios.get.mockRejectedValue(new Error());

		await expect(getPackageData()).rejects.toThrow('Failed to fetch package data');
	});
});
