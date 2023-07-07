const fs = require("fs");
const {execSync} = require('child_process')
const utils = require('./utils')

const createAppFolder = ()=>{
    const kernelContent = `// require your middlware files
//const variableName = require('./middlewares/middlware_file_name')
    
// middlwares for web
const WebMiddlewares = [
    //variableName.function,

]

    
// middlwares for web
const ApiMiddlwares = {
    
}
    
    
module.exports = {
WebMiddlewares,
ApiMiddlwares
}`
   if(utils.checkFolder('app')==false){
    fs.mkdir('app', { recursive: true }, (err) => {
        if (err) {
          // check if controller folder exists inside app
           if(utils.checkFolder('app/controllers') == false){
            // create controller folder
            fs.mkdir('app/controllers', { recursive: true }, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("controller folder has been created successfully.");
                }
              });
           }

           // check middlwares folder inside app
              if(utils.checkFolder('app/middlewares') == false){
                // create middlewares folder
                fs.mkdir('app/middlewares', { recursive: true }, (err) => {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log("middlewares folder has been created successfully.");
                    }
                  });
               }
        } else {
            // create controller folder
            fs.mkdir('app/controllers', { recursive: true }, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("controller folder has been created successfully.");
                }
              });
              // create middlewares folder
              fs.mkdir('app/middlewares', { recursive: true }, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("middlewares folder has been created successfully.");
                }
              });
            }
        });

        // check app/kernel.js
        if(utils.checkFile('app/kernel.js')==false){
            // create kernel.js
            fs.writeFile("app/kernel.js", kernelContent, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("kernel.js file has been created successfully.");
                }
              }
            );
        }
   }
   else{
    // check for controller folder
    if(utils.checkFolder('app/controllers') == false){
        // create controller folder
        fs.mkdir('app/controllers', { recursive: true }, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("controller folder has been created successfully.");
            }
          });
       }
       // check for middlware folder
         if(utils.checkFolder('app/middlewares') == false){
            // create middlware folder
            fs.mkdir('app/middlewares', { recursive: true }, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("middlewares folder has been created successfully.");
                }
              });
           }

              // check app/kernel.js
        if(utils.checkFile('app/kernel.js')==false){
            // create kernel.js
            fs.writeFile("app/kernel.js", kernelContent, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("kernel.js file has been created successfully.");
                }
              }
            );
        }

   }
}
const createKexpressDB = ()=>{
    const kexpressdb = `const mongoose = require('mongoose')
require('dotenv').config()
const connection = mongoose.connect(process.env.KEXPRESS_DB_URL, {useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection
// test
db.on('error', ()=> console.log('connection error'))
db.once('open', ()=> console.log('Connected to MongoDB')
)
module.exports = connection`;
    // check if kexpressDB exists
    fs.access("kexpressDB.js", fs.constants.F_OK, (err) => {
        if (err) {
          // kexpressDB does not exist, so create it
          fs.writeFile("kexpressDB.js", kexpressdb, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("kexpressDB.js file has been created successfully.");
            }
          });
        } else {
          // kexpressDB exists
          console.log("kexpressDB.js file already exists");
        }
        });
}
const createRoutesFolder = ()=>{
    const web = `const express = require('express')
const router = express.Router()
const kernel = require('../app/kernel')


// routes
router.route('/')
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
    // create routes folder
  fs.access("routes", fs.constants.F_OK, (err) => {
    if (err) {
      // routes folder does not exist, so create it
      fs.mkdir("routes", { recursive: true }, (err) => {
        if (err) {
          // check if web.js exists inside the routes folder
            fs.access("routes/web.js", fs.constants.F_OK, (err) => {
                if (err) {
                    // web.js does not exist, so create it
                    fs.writeFile("routes/web.js", web, (err) => {
                        if (err) {
                        console.error(err);
                        } else {
                        console.log("web.js file has been created successfully.");
                        }
                    });
                    }
                    else {
                        // web.js exists
                        console.log("web.js file already exists");
                    }
            });
        } else {
          // create web.js inside routes
            fs.writeFile("routes/web.js", web, (err) => {
                if (err) {
                console.error(err);
                } else {
                console.log("web.js file has been created successfully.");
                }
            }
            );
        }
      });
    } else {
      // routes folder exists
      console.log("routes folder already exists")
    }
  });
}
const createModelsFolder = ()=>{
    const UserModel = `const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Users schema
let userSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters long"],
  },
 

    // if you want to use soft delete uncomment below code
//   isDeleted:{
//     type:Boolean,
//     default:false
//   }
});
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

module.exports = Users;
`;

// create models folder with User.js model
fs.access("models", fs.constants.F_OK, (err) => {
    if (err) {
      // models folder does not exist, so create it
      fs.mkdir("models", { recursive: true }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("models folder has been created successfully.");
          fs.writeFile("models/User.js", UserModel, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("User.js file has been created successfully.");
            }
          });
        }
      });
    } else {
      // models folder exists
      console.log("models folder already exists");
      // check if user model exists
        fs.access("models/User.js", fs.constants.F_OK, (err) => {
            if (err) {
              // User.js model does not exist, so create it
              fs.writeFile("models/User.js", UserModel, (err) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("User.js file has been created successfully.");
                }
              });
            } else {
              // User.js model exists
              console.log("User.js file already exists");
            }
          });
        }
    });
}
const createEnv = ()=>{
    // install express
execSync('npm install express')
//npm install dotenv
execSync('npm install dotenv')
// npm install body parser
execSync('npm install body-parser')
  // npm install mongoose
  execSync('npm install mongoose')
    const envContent = `# kexpress variable
KEXPRESS_DB_URL=
`;
    // create kexpressDB
    createKexpressDB()
    // create routes folder
    createRoutesFolder()
    // create models folder
    createModelsFolder()
    // create app folder
    createAppFolder()

    if(utils.checkFile('.env') == false){
        // create env file with envContent
        fs.writeFileSync('.env', envContent)
    }
    else{
        // append env file
        fs.appendFileSync('.env', envContent)
    }
}


module.exports = {
    createEnv
}