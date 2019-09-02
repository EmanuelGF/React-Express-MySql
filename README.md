Welcome to the demo app for REACT EXPRESS MYSQL with AUTH(sessions and passport).

I put togheter this VERY SIMPLE app just to practice concepts and test some ideas and YES it could be better... So feel free to share your knowledge and make this a valuable boilerplate code.  
Anyways if you use this code make sure to add validations to both client and server side and protected routes and password encription and https and so on... you get the picture :)

Ok, so here are the specs:
Check it out! 

The app uses: 
    "express": "^4.17.1",
    "express-mysql-session": "^2.1.0",
    "express-session": "^1.16.2",
    "mysql": "^2.17.1",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "uuid": "^3.3.3"

Structure is as follows:
DEMO-PROJECT
    demo-react-app 
        node-modules
        public
        src
            Components
                ...
    demo-server
        database
        node-modules
        server.js


Notes: 
*You can run express and react using [npm start] inside both directories.
*Use Workbench to manage mysql databases. Makes the job a lot easyer when in development.

Read the code comments to better understand the code.

Peace
EmanuelGF