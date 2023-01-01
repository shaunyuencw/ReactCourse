# Getting started with React

## Creating a new React App
```Bash
npx create-react-app AppName
cd AppName
npm start
```

## Additional Dependencies
```Bash
npm install axios
npm install json-server --save-dev
```

### Add to package.json
```json
{
  // ... 
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 --watch db.json" // Add this
  }, 
}
```