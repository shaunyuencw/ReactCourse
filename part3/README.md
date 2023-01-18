# Part 3
## **Part 3a Node.js and Express**
*Setting up npm scripts*<br>
In the package.json file
```json
{
    //...
    "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    //../
}
```

*Configuring a basic web server*
```JavaScript
const http = require('http')

let someArr = [1, 2, 3] // You can initialize server variables that will stay as long the server is up
// Values will reset if the server restarts!

const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(JSON.stringify(someArr))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

Then run **node index.js**

*Installing and Setting up Express*
```Bash
npm install express
```

```JavaScript
const express = require('express')
const app = express()

let notes = [
    // ...
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/someDB', (request, response) => {
    response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```

*Nodemon (Restarting server on save change)*
```Bash
npm install --save-dev nodemon
```

In package.json, add a script for "dev"
```json
{
    //...
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    //../
}
```
```Bash
npm run dev
```

*Common REST API Request*
| URL | Verb | Functionality |
| --- | ---  | --- |
| someDB/id | GET | Fetches a single resource |
| someDB | GET | Fetches all resources in the collection | 
| someDB | POST | Creates a new resource based on the request data |
| someDB/id | DELETE | Remove the identified resource |
| someDB/id | PUT | Replaces the entire identified resource with the request data |
| someDB/id | PATCH | Replaces a part of the identified resource with the request data |

*Fetching a single resource*
```JavaScript
app.get('/api/someDB/:id', (request, response) => {
    const id = request.params.id
    const someItem = someDB.find(item => item.id === id)
    if (someItem) {
        response.json(someItem)
    }
    else {
        response.status(404).end()
    }
    
})
```

*Deleting resources*
```JavaScript
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    someDB = someDB.filter(item => item.id !== id) // Filter everything except the item to delete

    response.status(204).end()
})
```

*Testing API Request*
There are many ways to test, some popular ones include Postman. But I personally prefer not leaving my IDE being VSCode, instead I use the extension Thunder Client<br>
[Postman](https://www.postman.com/downloads/)<br>
[Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

## **Part 3b Deploying app to Internet**
*Same origin policy (Middleware)* <br>
The **Same Origin Policy** is a security measure that restricts a web page from making requests to a different domain than the one it came from. This is to prevent a malicious website from accessing sensitive information from other sites on the user's behalf. It applies to all types of web requests.<br>
<br>
To resovle this, we use CORS (Cross-Origin Resource Sharing), it is a mechanism that allows a web page to make requests to a different domain than the one it came from, while still enforcing the same-origin policy. It does this by adding additional HTTP headers to the request and response that indicate that the request is allowed to be made from a different domain. <br>
The server can then decide whether or not to allow the request based on the headers received.

```Bash
npm install cors
```

```JavaScript
const cors = require('cors')

app.use(cors())
```

*Deploying the application to the Internet* <br>
For both Fly.io and Heroku, we need to change the definition of the port our application uses at the bottom of the index.js file like so:
```JavaScript
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```
A **.env** file must be created with the PORT is should use. *Make sure you have the dotenv package

*Fly.io Setup guide*
[Installing FlyCtl](https://fly.io/docs/hands-on/install-flyctl/)
```Bash
flyctl auth login
```

*Deploying for the first time **(Windows)***
```Bash
cd client
npm run build
XCopy /S /E /I /Y "build/" "../server/build"
cd ../server
flyctl launch
```

*Pushing updates*
```Bash
cd client
npm run deploy:full
```

*Streamlining deploying of the frontend*
```json
{
    "scripts": {
        "build:ui": "del build /q && npm run build && XCopy /S /E /I /Y \"build\" \"../server/build/\"",
        "start": "react-scripts start",
        "deploy": "cd ../server && flyctl deploy",
        "logs:prod": "flyctl logs",
        "build": "react-scripts build",
        "deploy:full": "npm run build:ui && npm run deploy"
    },
    "resolutions": {
        "mini-css-extract-plugin": "2.4.5"
    },
    "proxy": "http://localhost:3001"
}
```


## **Part 3c Saving data to MongoDB**
TBC

## **Part 3d Validation and ESLint
TBC