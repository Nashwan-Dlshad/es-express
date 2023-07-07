const fs = require("fs");
const {execSync} = require('child_process')
const utils = require('./utils')


const createController = (name)=>{
    // check for controller name
    if(utils.checkFile('app/controller/'+name) == false) {
        // create controller file
        const controllerContent = `// main function to select all data
const index = (req, res)=>{}

// show function to show one data
const show = (req, res)=>{}

// edit function to get one element to update
const edit = (req, res)=>{}

// create function to show upload page
const create = (req, res)=>{}

// store function to store data
const store = (req, res)=>{}

// update function to update data
const update = (req, res)=>{}

// soft delete function to soft delete data
const softDelete = (req, res)=>{}

// hard delete function to hard delete data
const hardDelete = (req, res)=>{}


module.exports = {
index,
show,
edit,
create,
store,
update,
softDelete,
hardDelete
}`
        fs.writeFile('app/controllers/'+name+'.js', controllerContent, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`${name+'.js'} file has been created successfully.`);
            }
          }
        );
    }
    else{
        console.log(`${name+'.js'} file already exists`);
    }
}

const createMiddlware = (name)=>{
    const middlwareContent = `// main function to select all data
const ${name} = async (req, res, next) => {
        next()
}
    module.exports = {
        ${name}
    }
    `
    // check for middlware name
    if(utils.checkFile('app/middlewares/'+name) == false) {
        // create middlware file
        fs.writeFile('app/middlewares/'+name+'.js', middlwareContent, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`${name+'.js'} file has been created successfully.`);
            }
          });
    }
    else{
        console.log(`${name+'.js'} file already exists`);
    }

}

const createModel = (name)=>{
    const modelContent = `const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Users schema
let ${name}Schema = new Schema({
id: {
type: Number,
unique: true,
required: true,
},

// for enabling soft delete uncomment bellow
// isDeleted:{
// type: Boolean,
// default: false
// }
})
const ${name} = mongoose.models.${name} || mongoose.model("${name}", ${name}Schema);
module.exports = ${name};`;

    // check for model name
    if(utils.checkFile('models/'+name) == false) {
        // create model file
        fs.writeFile('models/'+name+'.js', modelContent, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`${name+'.js'} file has been created successfully.`);
            }
          });
    }
    else{
        console.log(`${name+'.js'} file already exists`);
    }
}

const createRoute = (name)=>{
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
`
const serverRequire = `const ${name}Route = require('./routes/${name}');`
const serverUse = `app.use('/${name}', ${name}Route);`

// check if route is exists
if(utils.checkFile('routes/'+name+".js") == false) {
    // create route file
    fs.writeFile('routes/'+name+'.js', web, (err) => {
        if (err) {
          console.error(err);
        } else {
                // add server use after routes comment
                fs.readFile("server.js", "utf8", function (err, data) {
                    if (err) {
                      console.log(err);
                    } else {
                      let result = data.replace(
                        "//routes",
                       "//routes \n" + serverUse 
                      ).replace(
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
}
else{
    console.log(`${name+'.js'} file already exists`);
}
}

const createServer = (port, host)=>{
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
const db = require("./kexpressDb");
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
    if(utils.checkFile('server.js') == false) {
        // create server file
        fs.writeFile('server.js', serverContent, (err) => {
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
                }
                else{
                   
                    // add kexpress:nodemon server.js
                    let packageJson = JSON.parse(data);
                    packageJson.scripts["kexpress-serve"] = "nodemon server.js";
                    fs.writeFile("package.json", JSON.stringify(packageJson), function (err) {
                        if (err) return console.log(err);
                        // beautify package.json
                        console.log("kexpress script added to package.json");
                      }
                    );

                    // beautify package.json
                    fs.readFile("package.json", "utf8", function (err, data) {
                        if (err) {
                             console.log(err);
                            let packageJson = JSON.parse(data);
                                fs.writeFile("package.json", JSON.stringify(packageJson, null, 2), function (err) {
                                    if (err) return console.log(err);
                                    // beautify package.json
                                    console.log("package.json beautified");
                                  }
                                );
                            }
                            else{
                              // beautify
                                let packageJson = JSON.parse(data);
                                fs.writeFile("package.json", JSON.stringify(packageJson, null, 2), function (err) {
                                    if (err) return console.log(err);
                                    // beautify package.json
                                    console.log("package.json beautified");
                                  }
                                );
                            }
                    }
                    );
                }
        });
    }
    else{
        console.log(`server.js file already exists`);
    }
}

module.exports = {
    createController,
    createMiddlware,
    createModel,
    createRoute,
    createServer
}