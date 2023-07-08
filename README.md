<!-- information about this package -->

# Package: [es-express]

## Description

The "es-express" package is a comprehensive npm package designed to simplify the development of Express.js applications that utilize MongoDB as the database. With a wide range of features, it aims to streamline the creation of routes, middleware, controllers, models, and server setup while seamlessly integrating with Mongoose for database connectivity.

Key features of the "es-express" package include:

Route Creation: It provides an intuitive interface to create routes in Express.js, allowing you to define endpoints for handling HTTP requests efficiently.

Middleware Support: The package offers built-in support for middleware functions, enabling you to implement custom logic for request preprocessing, authentication, error handling, and more.

Controller Management: It simplifies the organization and management of controllers, making it easier to separate business logic from route definitions and enhance code modularity.

Express.js Server Setup: The package facilitates the creation of an Express.js server with default configurations, providing a straightforward way to get your server up and running quickly.

Model Integration: It offers seamless integration with Mongoose, allowing you to define data models with schemas and effortlessly interact with the MongoDB database.

Database Connectivity: The package provides utilities to establish and manage connections to MongoDB using Mongoose, ensuring smooth communication between your Express.js application and the database.

Command-Line Interface (CLI): It offers a command-line interface that simplifies the creation of routes, middleware, controllers, models, and server setup. With the CLI, you can quickly generate the necessary boilerplate code for these components, saving development time and effort.

CRUD and Filtering Functions: It includes pre-built functions for common CRUD operations (Create, Read, Update, Delete) on MongoDB collections, as well as filtering functions to retrieve specific data based on defined criteria.

The "es-express" package aims to provide a comprehensive toolkit for Express.js development, covering various aspects such as routing, middleware, controllers, server setup, database connectivity, and common database operations. It combines convenience and efficiency by offering a command-line interface and integrating seamlessly with Mongoose for MongoDB interaction.

## Installation

To install the "es-express" package, run the following command in your terminal:
`bash
    npm init
    `

    ```bash
    npm i es-express
    ```

## Prepare Environment

    ```bash
    npm run es-express config
    ```

<!-- run this command to create server

 -->

## Create Server

    ```bash
    #default port=3000 host=localhost
    npm run es-express create-server [port] [host]
    ```

<!-- create command types:
    - route
    - middleware
    - controller
    - model
 -->

## Create files

    ```bash
    #npm run es-express create <type> <name>
    #type:route, controller, model, middleware

    # example
    npm run es-express create route user
    ```

<!-- controller usage -->

## Controller Usage

    ```javascript
const Queries = require("es-express/db/mongoose/queries");
// require your models
require("../../models/User");

class UserController extends Queries {
constructor() {
// Initialize queries
super();
}

async index(req, res) {
    const users = await (await (await this.model("Users").findId(2)).with(["rel1"])).get()
}

async show(req, res) {
}

async store(req, res) {
}

async update(req, res) {
}

async destroy(req, res) {
}

async forceDelete(req, res) {
}
}

const Usercontroller = new UserController();
const exportedFunctions = {
  index: Usercontroller.index.bind(Usercontroller),
show: Usercontroller.show.bind(Usercontroller),
store: Usercontroller.store.bind(Usercontroller),
update: Usercontroller.update.bind(Usercontroller),
destroy: Usercontroller.destroy.bind(Usercontroller),
forceDelete: Usercontroller.forceDelete.bind(Usercontroller),
};

module.exports = exportedFunctions;
```

<!-- model usage -->

## Model Usage

The provided code defines a schema object that represents the structure and properties of a data model. It includes two fields: "id" and "isDeleted". Here's a breakdown of each field's definition:

"id" Field:

Type: Number
Unique Constraint: Indicates that each value in this field must be unique across all documents in the collection.
Required Constraint: Specifies that this field must have a value present in order for a document to be considered valid.
"isDeleted" Field:

Type: Boolean
Default Value: If no value is provided for this field during document creation, it will default to "false".

    ```javascript

schema = {
id: {
    type: Number,
    unique: true,
    required: true,
},

isDeleted:{
    type:Boolean,
    default:false
}
}

```

   To add more fields to the schema, you can simply include them within the "schema" object, following the same pattern as the existing fields. For example, let's say you want to add a "name" field:

    ```javascript
    #schema = {
        id: {
            type: Number,
            unique: true,
            required: true,
        },
        isDeleted:{
            type:Boolean,
            default:false
        },
        name:{
            type:String,
            required:true
        }
    }
    ```

    In this example, a new field named "name" is added to the schema. It has a type of String and is marked as required, meaning it must have a value present for a document to be considered valid.

Regarding the "isDeleted" field, it seems to be used for soft deletion. Soft deletion is a technique where instead of physically removing a record from the database, a flag or field, such as "isDeleted", is set to indicate that the record is logically deleted. This approach allows for potential recovery or restoration of deleted data in the future if needed.

<!-- route usage -->

## Route Usage
The provided code defines a route that handles HTTP requests for the root endpoint ("/") of the application.

```javascript
const UserController = require('../app/controllers/UserController')

// routes
router.route('/')
.get(async (req, res)=> new UserController().index(req, res))
.post((req, res)=>{
    res.send('Hello World')
})
.put((req, res)=>{
    res.send('Hello World')
})
.delete((req, res)=>{
    res.send('Hello World')
})
```

Importing the Controller:

The code imports the UserController from the ../app/controllers directory. This controller likely contains the logic for handling user-related operations.
Defining the Route:

The code uses the router.route('/') method to define the route for the root endpoint ("/") of the application.
The route will handle HTTP GET, POST, PUT, and DELETE requests to this endpoint.
Handling the GET Request:

The code defines a GET request handler using the .get() method.
The handler is an asynchronous function that creates an instance of the UserController and calls its index method, passing the req and res objects as parameters.
The index method likely performs specific logic related to retrieving user data and generating a response, which is then sent back to the client.
Handling the POST, PUT, and DELETE Requests:

The code defines separate request handlers for POST, PUT, and DELETE requests using the .post(), .put(), and .delete() methods, respectively.
For each handler, a response with the string "Hello World" is sent back to the client.
In summary, this route handles various types of requests to the root endpoint ("/") of the application. The GET request is delegated to the index method of the UserController, which likely performs user-related operations and generates a response. The POST, PUT, and DELETE requests all respond with the string "Hello World" to the client.


##Middleware Usage

The provided code exports a middleware function named runMiddleware. Here's a description of its functionality

```javascript
const runMiddleware = (req, res, next) => {
  console.log("middlware running...");
  next();
};
module.exports = runMiddleware;
```

Middleware Function:

The runMiddleware function is a middleware that is executed during the processing of an HTTP request.
It takes three parameters: req (request object), res (response object), and next (a callback function).
Inside the middleware function, the code logs the message "middleware running..." to the console.
The next function is invoked, allowing the request to proceed to the next middleware or route handler in the chain.
Exporting the Middleware:

The runMiddleware function is exported using module.exports.
This allows other parts of the application to import and use this middleware function.

<!-- kernel.js -->

## Kernel.js

The provided code exports a middleware function named runMiddleware.

```javascript
// require your middlware files
const runMiddleware = require("./middlewares/runMiddleware");

// middlwares for web
const WebMiddlewares = [runMiddleware];

// middlwares for API
const ApiMiddlwares = {};
```

Importing Middleware:

The code imports a middleware function named runMiddleware from the ./middlewares/runMiddleware file.
This assumes that there is a separate file runMiddleware.js in the middlewares directory that exports the middleware function.
Web Middlewares:

The WebMiddlewares array is created to store middleware functions that will be applied to the web application.
In this example, the runMiddleware function is added to the WebMiddlewares array.
Additional middleware functions can be added to this array if needed for the web application.
API Middlewares:

The ApiMiddlwares object is created to store middleware functions that will be applied to the API.
Currently, the object is empty, indicating that no middleware functions are defined specifically for the API.
Middleware functions can be added to the ApiMiddlwares object if required for the API functionality.
Overall, this code demonstrates the organization of middlewares for a web application and an API. The WebMiddlewares array contains middleware functions that will be applied to the web application, while the ApiMiddlwares object can be used to store middleware functions specifically for the API.

To use the middleware functions, they need to be registered with the appropriate middleware handler or router in your application. The exact implementation will depend on the framework or library you are using for your web application or API.

## Contact

If you have any questions, suggestions, or feedback regarding this project, feel free to reach out to me.

Email: nashwan.dlshad@gmail.com

LinkedIn: linkedin.com/in/nashwan-dlshad-745a8a211

GitHub: https://github.com/Nashwan-Dlshad

Please don't hesitate to contact me if you need any assistance or have any inquiries related to this project. I am always happy to connect with developers and discuss ideas or collaborate on new projects.

## Thank you

Thank you once again for choosing our package. We are excited to be a part of your development journey, and we look forward to seeing the innovative applications you create.
