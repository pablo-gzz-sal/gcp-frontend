# GcpFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.14.


## Tech Stack

- **Angular 18**
- **Tailwind CSS**
- **Angular HTTPClient** (for API communication)
- **LocalStorage** (for storing authentication tokens)

## Installation

1. Navigate to the frontend directory:    
    ### `cd gcp-fronted`

2. Install dependencies:
    ###  `npm install`

3. Start the development server:
    ###  `npm start`

Open [http://localhost:4200](http://localhost:4200) to view it in the browser.


## Authentication Process

1. The user logs in with email & password.
2. The frontend sends a request to the backend.
3. If successful, the backend returns a JWT token.
4. The token is stored in localStorage.
5. The user can now access protected routes.


## Scripts

###  `npm start`  Starts the development server.



