# Deploying to fly.io

## If deploying for the first time
```Bash
cd client
npm run build
XCopy /S /E /I /Y "build/" "../server/build"
cd ../server
flyctl launch
```

## Subsequent updates
```
cd client
npm run deploy:full
```

## Important things to note in Server
```JavaScript
const dotenv = requre('dotenv')
const cors = require('cors')

const app = express()

dotenv.config()
app.use(cors())
app.use(express.static('build'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
```

## In Client
```json
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
```
