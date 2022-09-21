## Demo Bot 

This project is a simple demo bot using x-state.

## Prerequisites
- Node.js 
- Yarn or NPM


## Installation
- Install dependencies with yarm
```bash
yarn install 
```
- Install dependencies with npm
```bash
npm install 
```
## Running the app

- Start Application in development mode 
```bash
npm run dev
```
The application will be live on http://localhost:5000 and you can view the docs on  http://localhost:5000/docs

- Start Application in production mode
```bash
npm run build
```

```bash
npm run start
```

The application will be live on http://localhost:5000 and you can view the docs on  http://localhost:5000/docs

## Running the app with docker

You can also run this application using docker by building the image and mapping the necessary ports. This process requires that you have docker pre-installed in your system.
 
To proceed,navigate to the root directory of the application and build the application image using the following command:

```bash
docker build . -t <your username>/yandit-air-quality-api
```
Run your image in detached mode with -d tag. The -p flag map a public port to a private port inside the container. Run the image you previously built using the command:

```bash
docker run -p 5000:5000 -d <your username>/yandit-air-quality-api
```

The application will be live on http://localhost:5000 and you can view the docs on  http://localhost:5000/docs

## Stay in touch

- Author - [Ogbonna Vitalis](agavitalisogbonna@gmail.com)

## License

Nest is [MIT licensed](LICENSE).
