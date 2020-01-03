# OpenSea Backend Programming Challenge

## Installation

#### Prerequisites
In order to launch the solution you will need to have Node installed.
You can get latest version from [Node.js Official Website](https://nodejs.org/en/)
After you download and install Node, you can proceed to next step.
 
#### Install dependencies 
Together with Node you will have `npm` - Node Package Manager, utility which will help you install all the dependencies.
Let's fetch all the required packages, by running in your preferred terminal the following command:
```
npm install
```

After the process is finished, you can "spin up" the server by running:
```
npm start
```
The server will listen for requests on port `3000`. If this port is occupied, you can alter it at line #57 in `index.js` 
file.

## Run tests
You can run test by executing in terminal:
```
npm test
```

#### Space/Time Complexities
Our web service provides us with 4 different endpoints.
 1) `PUT at /names/[name]` - Since we don't need to store values between server restarts, we can utilize simple Javascript
 object to store all key-value pairs. Time complexity is `O(1)` - inserting new items into object is operation with "constant" 
 time of execution. Space complexity in this case would be `O(n)` - the size of our db object it will grow linear with 
 amount items we put into it. 
 
 2) `GET /names/[name]` - Time complexity is `O(1)` - getting item from object is operation with constant time of 
 execution. Space complexity the same as above `PUT` method - `O(n)`
 
 3) `DELETE` at `/names/[name]` - Time complexity is `O(1)` - instead of removing the item, we will simply assign `null` 
 value to it, which will result in falsy check. Space complexity the same as above methods - `O(n)`
 
 4) `POST` at `/annotate` - The package we are using to parse and process is utilizing SAX parser, which helps to limit 
 space complexity to `O(1)`. Assumed time complexity of SAX parser is `O(n)`, then finding and replacing items in the 
 string, based on provided regular expression is also `O(n)`, thus total time complexity would be `O(x^2)`
