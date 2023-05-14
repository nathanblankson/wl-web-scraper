const cheerio = require('cheerio');

const PACKAGE_SELECTORS = require('./config/package-selectors');

const { fetchHTML } = require('./utils/html-utils')
const { url } = require('./config/config.js')

function parsePackageData(html) {
    const $ = cheerio.load(html);
    const packages = $(PACKAGE_SELECTORS.package);
    const packageData = [];

    packages.each(function () {
        const optionTitle = $(this).find('h3').text();

        // Replace the <br> tags within the description with spaces
        const description = $(this)
            .find(PACKAGE_SELECTORS.description)
            .find('br')
            .replaceWith(' ')
            .end()
            .text();

        // Convert the pricing string to a floating point number, for example '£5.99' to 5.99
        const priceString = $(this).find(PACKAGE_SELECTORS.price).text();
        const price = parseFloat(priceString.replace('£', ''));

        const discount = $(this).find(PACKAGE_SELECTORS.discount).text() || null;

        const package = {
            optionTitle,
            description,
            price,
            discount,
        };

        packageData.push(package);
    });

    // Sort packages by annual price, most expensive package first
    packageData.sort((a, b) => {
        const annualPriceA = a.price * (a.optionTitle.includes('Year') ? 1 : 12);
        const annualPriceB = b.price * (b.optionTitle.includes('Year') ? 1 : 12);

        return annualPriceB - annualPriceA;
    });

    return packageData;
}

async function getPackageData() {
    try {
        const html = await fetchHTML(url);

        return parsePackageData(html);
    } catch (error) {
        throw new Error('Failed to fetch package data');
    }
}

module.exports = {
    parsePackageData,
    getPackageData
};