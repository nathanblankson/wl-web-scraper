const { getPackageData } = require('./scraper')

async function main() {
  try {
    const packageData = await getPackageData();
    console.log(packageData);
  } catch (error) {
    console.error(error);
  }
}

main();