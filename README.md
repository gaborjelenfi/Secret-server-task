<p align=center>
<img src="/images/mongodb.png" height="50px">
<img src="/images/expressjs.png" height="50px">
<img src="/images/node.png" height="50px">
<img src="/images/vuejs.png" height="50px">
</p>

# Secret-server-task
> Create a secret message,
> Store in database,
> Request the decoded message for a limited time.


## Installation
After downloaded or cloned the project.
You need to add your own **MongoDB Key** in **`/app.js`** at **`line-34: const connectionString = "USE_YOUR_MONGODB_KEY";`**.
Install the dependencies to both **Backend** and **Frontend** and start them separately.
```sh
cd secretServer
npm install
npm run start:dev
```
```sh
cd Frontend/secretServerFrontend
npm install
npm run dev
```

## Technologies Used
- Backend:
  - NodeJS
  - ExpressJS
  - REST API
  
- Database:
  - MondoDB / Mongoose

- Frontend:
  - VueJS
  - Axios
  
 For the full list of dependencies check the package.json files at `/secretServer` and at `/Frontend/secretServerFrontend` please.

#### Usage:
Create a new secret:
 1. Just fill the form
   - Secret message: Any text message
   - Expire after a number of views: Any positive number
   - Expire after minutes: 
     - any positive number
     - zero means never expire
 2. Click on the *Create* button.
 
 See the stored secret message:
  1. Click on the *Show* button to reveal the secret
  
 Go back to home page:
  1. Use the **Home** button at the top left corner
  
 Simple as that.
 
 ## Screenshot
 
 <p align=center>
<img src="/images/list.png">
</p>
