├── config
│ └── config.js
├── controller
│ └── controller.js
├── modules
│ └── modules.js
├── test
│ └── test.js
├── package-lock.json
├── package.json
└── server.js

### Files and Directories

- **config/**: Contains the application configuration.
  - `config.js`: Main configuration file.

- **controller/**: Contains the application controllers.
  - `controller.js`: Main application controller.

- **modules/**: Contains the custom modules of the application.
  - `modules.js`: Main module containing business logic and functions.

- **test/**: Contains the application tests.
  - `test.js`: Main test file.

- **package-lock.json**: Automatically generated file by npm to ensure dependency consistency.

- **package.json**: Contains project configuration and dependencies.

- **server.js**: Main file that starts the Express server and Localtunnel.

## Setup and Installation

1. Clone the repository:

 git clone <davidibarguenlozano/Backend-MyCup/> cd <Backend-Mycup>
2. Install the dependencies:

npm install

Usage:

pm2 start server.js --name myapp

pm2 status

pm2 logs myapp

Stop the Server
pm2 stop myapp

Dependencies
express
cors
body-parser
bcrypt
jsonwebtoken
localtunnel
pm2
Contributing
Fork the project.
Create a new branch (git checkout -b feature/new-feature).
Make the necessary changes and commit them (git commit -am 'Add new feature').
Push to the branch (git push origin feature/new-feature).
Create a new Pull Request.


