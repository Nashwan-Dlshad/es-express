const fs = require("fs");
const { execSync } = require("child_process");
const utils = require("./utils");

const createController = (name) => {
  // check for controller name
  if (utils.checkFile("app/controllers/" + name+"Controller.js") == false) {
    // create controller file
    const controllerContent = `const Queries = require("es-expressjs/db/mongoose/queries");
class UserController extends Queries {
  constructor() {
// Initialize queries
super();
  }

  async index(req, res) {
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

const ${name}controller = new ${name}Controller();
const exportedFunctions = {
  index: ${name}controller.index.bind(${name}controller),
  show: ${name}controller.show.bind(${name}controller),
  store: ${name}controller.store.bind(${name}controller),
  update: ${name}controller.update.bind(${name}controller),
  destroy: ${name}controller.destroy.bind(${name}controller),
  forceDelete: ${name}controller.forceDelete.bind(${name}controller),
};

module.exports = exportedFunctions;
`;
    fs.writeFile(
      "app/controllers/" + name+"Controller.js",
      controllerContent,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${name + "Controller.js"} file has been created successfully.`);
        }
      }
    );
  } else {
    console.log(`${name + "Controller.js"} file already exists`);
  }
};

const createMiddlware = (name) => {
  const middlwareContent = `// main function to select all data
const ${name} = async (req, res, next) => {
        next()
}
    module.exports = ${name}
    `;
  // check for middlware name
  if (utils.checkFile("app/middlewares/" + name) == false) {
    // create middlware file
    fs.writeFile("app/middlewares/" + name + ".js", middlwareContent, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${name + ".js"} file has been created successfully.`);
      }
    });
  } else {
    console.log(`${name + ".js"} file already exists`);
  }
};

const createModel = (name) => {
  const modelContent = `const mongoose = require("mongoose");
const Schema = mongoose.Schema;
class ${name}Model {
// protected variables
#document = "${name}";
#schema = {
id: {
  type: Number,
  unique: true,
  required: true,
},
name: {
  type: String,
  required: true,
},
rel1:{
  type:Schema.Types.ObjectId,
  ref:'test1',
  default:null
},
isDeleted:{
  type:Boolean,
  default:false
}
  }
  // constructor
  constructor() {
// create mongoose schema
this.schema = new Schema(this.#schema);
// create mongoose model
this.model = mongoose.model(this.#document, this.schema);
  }
}
    
    
// export model
module.exports = new ${name}Model()

`;

  // check for model name
  if (utils.checkFile("models/" + name) == false) {
    // create model file
    fs.writeFile("models/" + name + ".js", modelContent, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${name + ".js"} file has been created successfully.`);
      }
    });
  } else {
    console.log(`${name + ".js"} file already exists`);
  }
};

const createRoute = (name) => {
  const web = `const express = require('express')
    const kernel = require('../app/kernel.js')
const router = express.Router()


// routes
route.route('/${name}')
.get((req, res)=>{
    res.send('Hello World')
})
.post((req, res)=>{
    res.send('Hello World')
})
.put((req, res)=>{
    res.send('Hello World')
})
.delete((req, res)=>{
    res.send('Hello World')
})

router.use(kernel.WebMiddlewares)

module.exports = router;
`;
  const serverRequire = `const ${name}Route = require('./routes/${name}');`;
  const serverUse = `app.use('/${name}', ${name}Route);`;

  // check if route is exists
  if (utils.checkFile("routes/" + name + ".js") == false) {
    // create route file
    fs.writeFile("routes/" + name + ".js", web, (err) => {
      if (err) {
        console.error(err);
      } else {
        // add server use after routes comment
        fs.readFile("server.js", "utf8", function (err, data) {
          if (err) {
            console.log(err);
          } else {
            let result = data
              .replace("//routes", "//routes \n" + serverUse)
              .replace(
                "//include routes",
                "//include routes \n" + serverRequire
              );
            fs.writeFile("server.js", result, "utf8", function (err) {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      }
    });
  } else {
    console.log(`${name + ".js"} file already exists`);
  }
};

const createServer = (port, host) => {
  // if port missing
  if (!port) {
    port = 3000;
  }
  // if host missing
  if (!host) {
    host = "localhost";
  }
  const serverContent = `// requires
      const express = require("express");
const db = require("./es-expressDb");
const bodyParser = require("body-parser");
const app = express();
//include routes
const webRoute = require('./routes/web')

//middlwares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes
app.use('/', webRoute)

app.listen(${port}, '${host}', () => {
console.log('App is listening at http://${host}:${port}');
});
  `;
  execSync("npm install nodemon --save");

  // check if server file exists
  if (utils.checkFile("server.js") == false) {
    // create server file
    fs.writeFile("server.js", serverContent, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`server.js file has been created successfully.`);
      }
    });

    // add script to package.json
    fs.readFile("package.json", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      } else {
        // add es-express:nodemon server.js
        let packageJson = JSON.parse(data);
        packageJson.scripts["es-express:serve"] = "nodemon server.js";
        fs.writeFile(
          "package.json",
          JSON.stringify(packageJson),
          function (err) {
            if (err) return console.log(err);
            // beautify package.json
            console.log("es-express script added to package.json");
          }
        );

        // beautify package.json
        fs.readFile("package.json", "utf8", function (err, data) {
          if (err) {
            console.log(err);
            let packageJson = JSON.parse(data);
            fs.writeFile(
              "package.json",
              JSON.stringify(packageJson, null, 2),
              function (err) {
                if (err) return console.log(err);
                // beautify package.json
                console.log("package.json beautified");
              }
            );
          } else {
            // beautify
            let packageJson = JSON.parse(data);
            fs.writeFile(
              "package.json",
              JSON.stringify(packageJson, null, 2),
              function (err) {
                if (err) return console.log(err);
                // beautify package.json
                console.log("package.json beautified");
              }
            );
          }
        });
      }
    });
  } else {
    console.log(`server.js file already exists`);
  }
};

module.exports = {
  createController,
  createMiddlware,
  createModel,
  createRoute,
  createServer,
};
