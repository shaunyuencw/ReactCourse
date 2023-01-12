
# Part 1 
## **Part 1a Introduction to React**
*Creating a new React App from Scratch*
```Bash
npx create-react-app <App Name>
cd <App Name>

npm start
```

*index.js Format*
```JavaScript
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

*Component file*<br>
**Best Practice is to have components placed in a "components" folder.**
```JavaScript
const Component = (props) => (
    const { var1, var2 } = props
    return (
        <>
            <p>{var1} {var2}</p>
        </>
    )
)

// Usage: <Component var1=1 var2=2 />
export default Component
```

*Cloning a project*
```Bash
npm i # Install dependencies from package.json
```

## **Part 1b JavaScript**
*Declaring Constants & Variables*
```JavaScript 
const someConstant = 1
let someVCar = 2
```

*Arrays*
```JavaScript
const someArr = [1, 3, 2]

// Loop
someArr.forEach(value => {
    console.log(value)
})

// Appending
someArr.concat(5)

// Mapping
const mappedArr = someArr.map(value => value * 2)

// This can be useful for List and Select Tags
const list = someArr.map(value => `<li>${$value}</li>`)
```

*Objects*
```JavaScript
const someObj = {
    id: 0,
    someStr: "String",
    someArr: [],
}

// Accessing
console.log(someObj.id) // Dot notation
console.log(someObj['id']) // Brackets method
```

*Functions*
```JavaScript
// Arrow Function
const foo = (paramA, paramB) => {
    console.log(`${paramA} ${paramB}`)
}

// Tradition Function
function foo(paramA, paramB) {
    console.log(`${paramA} ${paramB}`)
}
```
## Part 1c Component State & Event Handlers
*Component Helper Functions*
```JavaScript
const Component = (props) => {
    const { var1, var2 } = props
    const helperFunction = () => {
        return var1 + var2
    }

    return (
        <>
            <p>{helperFunction(var, var2)}</p>
        </>
    )
}
```

*Page Re-rendering*
```JavaScript
let counter = 1

const refresh = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <App counter={counter} />
    )
}

// App will re-render everytime the counter variable changes value
setInterval(() => {
    refresh() 
    counter += 1
}, 1000)
```

*State Variables*
```JavaScript
    // State Variable, setState Function
    const [ counter, setCounter ] = useState(0)
```
**Change in state variables cause components that uses it to re-render.**

*Event Handling*
```JavaScript
const App = () => {
    const [ counter, setCounter ] = useState(0)

    // onClick must = some function
    const handleClick = () => {
        console.log('clicked')
    }

    return (
    <div>
        <div>{counter}</div>
        <button onClick={handleClick}>
            plus
        </button>
    </div>
    )

    // Alternatively
    // <button onClick={() => setCounter(counter + 1)}>
}
```

## **Part 1d Complex States, Debugging React Apps**
*State "Objects"
```JavaScript
// Instead of 
const [left, setLeft] = useState(0)
const [right, setRight] = useState(0)

// We could combine them into
// However, its not a very good practice...
const [clicks, setClicks] = useState({
    left: 0, right: 0
})

const handleLeftClick = () => {
    const newClicks = { 
        left: clicks.left + 1, 
        right: clicks.right 
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = { 
        left: clicks.left, 
        right: clicks.right + 1 
    }
    setClicks(newClicks)
  }
```

*Spread Operator "..."*
1. To spread the elements of an array into a new array
```JavaScript
let numbers = [1, 2, 3]
let moreNumbers = [...numbers, 4, 5, 6]
console.log(moreNumbers) // [1, 2, 3, 4, 5, 6]
```

2. To merge two or more arrays into a new one
```JavaScript
let a = [1, 2, 3]
let b = [4, 5, 6]
let combined = [...a, ...b]
console.log(combined) // [1, 2, 3, 4, 5, 6]
```

3. To spread the properties of an object into a new one
```JavaScript
let obj1 = { a: 1, b: 2 }
let obj2 = { ...obj11, c: 3 }
console.log(obj2) // { a: 1, b: 2, c: 3 }
```

4. The spread operator can also be used in function calls, to spread the element of an array as individual arguments
```JavaScript
let numbers = [1, 2, 3]
let max = Math.max(...numbers)
console.log(max) // 3
```

5. To modify an const obj1
``` JavaScript
const person = { name: "John Doe", age: 30 }
const updatedPerson = { ...person, age: 35 }
console.log(updatedPerson) // { name: "John Doe", age: 35 }
```

*React Golden Rules*
1. **useState** function (as well as the **useEffect**) must not be called from inside a loop, a condtional expression, or any place that is not a function defining a component. <br>This must be done to ensure that the hooks are always called in the same order. This prevents the application from behaving erratically.
2. Do not define components within components. <br>The biggest problems are because React treats a component defined inside of another component as a new component in every render. This makes it impossible for React to optimize the component.

