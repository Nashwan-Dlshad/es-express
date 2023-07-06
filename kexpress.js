const { program } = require("commander");
const fs = require("fs");
const { version } = require("./package.json");
program.version(version);
const {execSync} = require('child_process')


program
  .command("kexpress-config")
  .description("kexpress package configuration")
  .action(() => {
    const modelPath = "models";
    const envContent = `# kexpress variable
KEXPRESS_DB_URL=
`;
    const kexpressdb = `const mongoose = require('mongoose')
require('dotenv').config()
const connection = mongoose.connect(process.env.KEXPRESS_DB_URL, {useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection
// test
db.on('error', ()=> console.log('connection error'))
db.once('open', ()=> console.log('Connected to MongoDB')
)
module.exports = connection`;

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
// install express
execSync('npm install express')
//npm install dotenv
execSync('npm install dotenv')
// npm install body parser
execSync('npm install body-parser')
  // npm install mongoose
  execSync('npm install mongoose')
    fs.access(".env", fs.constants.F_OK, (err) => {
      if (err) {
        // .env file does not exist, so create it
        fs.writeFile(".env", envContent, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("kexpress variable added to .env");
          }
        });

        fs.writeFile("kexpressDb.js", kexpressdb, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("kexpress database configuration done.");
          }
        });

        // check if models folder exists or not
        fs.access(modelPath, fs.constants.F_OK, (err) => {
          if (err) {
            // models folder does not exist, so create it
            fs.mkdir("models", { recursive: true }, (err) => {
              if (err) {
                console.error(err);
              } else {
                fs.access("models/User.js", fs.constants.F_OK, (err) => {
                  if (err) {
                    // models/User.js file does not exist, so create it
                    fs.writeFile("models/User.js", UserModel, (err) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log(
                          "models/User.js file has been created successfully."
                        );
                      }
                    });
                  }
                });
              }
            });
          } else {
            // models folder exists, so do nothing
          }
        });
      } else {
        // .env file exists, so append content to it
        fs.appendFile(".env", envContent, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("kexpress variable added to .env");
          }
        });

        fs.writeFile("kexpressDb.js", kexpressdb, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("kexpress database configuration done.");
          }
        });

        // check if models folder exists or not
        fs.access(modelPath, fs.constants.F_OK, (err) => {
          if (err) {
            // models folder does not exist, so create it
            fs.mkdir("models", { recursive: true }, (err) => {
              if (err) {
                console.error(err);
              } else {
                fs.access("models/User.js", fs.constants.F_OK, (err) => {
                  if (err) {
                    // models/User.js file does not exist, so create it
                    fs.writeFile("models/User.js", UserModel, (err) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log(
                          "models/User.js file has been created successfully."
                        );
                      }
                    });
                  }
                });
              }
            });
          } else {
            // models folder exists, so do nothing
          }
        });
      }
    });
  });

//  terminal command to create file with content if not exists
program
  .command("create-model <filename>")
  .description("create model")
  .action((filename) => {
    const modelContent = `const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Users schema
let ${filename}Schema = new Schema({
id: {
type: Number,
unique: true,
required: true,
},
})
        const ${filename} = mongoose.models.${filename} || mongoose.model("${filename}", ${filename}Schema);
        module.exports = ${filename};`;
    fs.access("/models/" + filename + ".js", fs.constants.F_OK, (err) => {
      if (err) {
        // file does not exist, so create it
        fs.writeFile("models/" + filename + ".js", modelContent, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(
              `${filename + ".js"} file has been created successfully.`
            );
          }
        });
      } else {
        // file exists
        console.log(
          `${
            filename + ".js"
          } file already exists. Please try with another filename.`
        );
      }
    });
  });

//  terminal command to create server port and host as optional paramter
program
  .command("create-server [port] [host]")
  .description("create server")
  .action((port, host) => {
    // if port missing
    if (!port) {
      port = 3000;
    }
    // if host missing
    if (!host) {
      host = "localhost";
    }
    const serverContent = `const express = require("express");
const db = require("./kexpressDb");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.listen(${port}, '${host}', () => {
    console.log('App is listening at http://${host}:${port}');
});
`;
execSync("npm install nodemon --save", (err, stdout, stderr) => {
  if (err) {
      console.error(err);
      return;
  }
  console.log("stdout");
});
    fs.access("server.js", fs.constants.F_OK, (err) => {
      if (err) {
         // install nodemon
         
        // file does not exist, so create it
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
                }
                else{
                   
                    // add kexpress:nodemon server.js
                    let packageJson = JSON.parse(data);
                    packageJson.scripts["kexpress-server"] = "nodemon server.js";
                    fs.writeFile("package.json", JSON.stringify(packageJson), function (err) {
                        if (err) return console.log(err);
                        // beautify package.json
                        console.log("kexpress script added to package.json");
                      }
                    );

                    // beautify package.json
                    fs.readFile("package.json", "utf8", function (err, data) {
                        if (err) {
                            return console.log(err);
                            }
                            else{
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
      } else {
        // file exists
        console.log(`server.js file already exists.`);
      }
    });
  });

program.parse(process.argv);
