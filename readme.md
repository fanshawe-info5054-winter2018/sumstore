This is an ecommerce application for the Application Project course at Fanshawe College

#Installing dependencies

##Development dependencies
In order to install all dependencies for development purposes, run the following script:
`npm run installdev`

##Deployment dependencies
To install only the dependencies needed to run the project, run the following script:
`npm run inst`

#Running the project

##Development mode
To run the system in development mode, assuming the development dependencies are installed, run:
`npm run dev`

##Production mode
To run the system in production, assuming the bundle.js file is present under the /frontend folder, run:
`node index.js`