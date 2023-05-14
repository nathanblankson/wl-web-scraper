# Wireless Logic Assignment

This project is a web scraper developed as an assignment for Wireless Logic that scrapes https://wltest.dns-systems.net/ and returns an array of objects representing all the product options on the page, sorted by most to least expensive annual price using Node.js.

## Requirements:

Please ensure the following are installed on your machine:
- Yarn
- Node 14+

## Installation

1. Clone the repository:
```shell
git clone https://github.com/nathanblankson/wl-web-scraper.git
```

2. Navigate to the project directory:
```shell
cd wl-web-scraper
```

3. Install the dependencies using Yarn:
```shell
yarn install
```

## Usage

To start the application, run the following command:

```shell
yarn start
```

This will execute the index.js file, which retrieves and displays the package data.

## Testing

The project utilizes Jest for unit testing. To run the tests, use the following command:

```shell
yarn test
```

## Dependencies

The project has the following dependencies:

- [Axios - Version 1.4.0](https://www.npmjs.com/package/axios): For making HTTP requests
- [Cheerio - Version 1.0.0-rc.12](https://www.npmjs.com/package/cheerio): Used to parse and manipulate the loaded HTML

## Development Dependencies

The project uses the following development dependencies:

- [Jest - Version 29.5.0](https://www.npmjs.com/package/cheerio): Used to run unit tests

## Author

[@nathanblankson](https://www.github.com/nathanblankson)