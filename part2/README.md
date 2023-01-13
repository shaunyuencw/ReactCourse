# Part 2

## **Part 2a Rendering a collection, modules**
*Array Indexes as Keys*
```JavaScript
myArr.map((item, indexd) => ...)
```

*Compiling all custom components into one import*<br>
Example: You have 4 Custom components in you Components Folder
```
│
└── ReactApp ...
│  │
│  └─── components
│      │  
│      └───  Filter.js
│          | Notification.js
│          | Persons.js 
│          | PersonsForm.js 
│          | index.js
```
index.js
```JavaScript 
export { default as Filter } from './Filter';
export { default as Persons } from './Persons';
export { default as PersonsForm } from './PersonsForm';
export { default as Notification } from './Notification';
```

Importing into your project
```JavaScript
import { Filter, Persons, PersonsForm, Notification } from './components'
```

## **Part 2b Forms**
*Form Events*
1. onSubmit
2. onClick
3. onChange

*Conditional Variable Attachment*
```JavaScript
const result = (condition) ? trueVal : falseVal
```

*Filtering*
```JavaScript
someArr.filter(item => item.attr === true)
```

## **Part 2c Getting Data from Server**
*Installing a local json-server*
```Bash
npm install json-server --save-dev
```

Edit your package.json file to add in the following in scripts
```json
{
    // ...
    "scripts": {
        // ...
        "server": "json-server -p3001 --watch db.json",
        // ...
    }
}
```


You can access it from http://localhost:3001/yourfile
**Tip: Install [JSONVue](https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc) to read the json data in a prettified view in your browser**

*Using Axios*
```Bash
npm install axios
```

*Promise: A Promise is an object representing the eventual completion or failure of an asynchronous operation.*
There are 3 distinct states:
1. The promise is pending: It means that the final value is not available yet.
2. The promise is fulfilled: It means that the operation has been completed and the final value is available, which generally is a successful operation. This state is sometimes also called resolved.
3. The promise is rejected: It means that an error has prevented the final value from being determined, which generally represents a failed opertaion.

Example
```Javascript
const promise = axios.get('http://localhost:3001/someDB')

promise.then(response => {
    console.log(response)
})
```

Usage
```Javascript
axios 
    .get('http://localhost:3001/someDB')
    .then(response => {
        const someData = response.data
        // Do something with someData
        // Generally some hook
    })
```

## **Part 2d Altering data in Server**
TBC

## **Part 2e Adding Styles to React App**
TBC