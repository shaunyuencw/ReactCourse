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
TBC

## **Part 3c Saving data to MongoDB**
TBC

## **Part 3d Validation and ESLint
TBC