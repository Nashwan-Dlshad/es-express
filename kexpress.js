const { program } = require("commander");
const kconfig = require("./kexpress_commands/config")
const createCommands = require('./kexpress_commands/create_commands')


program
  .command("kexpress-config [views]")
  .description("kexpress package configuration")
  .action(() => {
      kconfig.createEnv()
  });

//  terminal command to create file with content if not exists
program
  .command("create <type> <filename>")
  .description("create <type> <filename>")
  .action((type,filename) => {
    switch(type){
        case 'model':
            createCommands.createModel(filename)
            break;

        case 'controller':
            createCommands.createController(filename)
            break;

        case 'middleware':  
            createCommands.createMiddlware(filename)
            break;

            case "route":
                createCommands.createRoute(filename)
                break;

       default:
            // list of my commands
            console.log('create <type> <filename>')
            console.log('type: model, controller, middleware')
            break;
    }

  });

//  terminal command to create server port and host as optional paramter
program
  .command("create-server [port] [host]")
  .description("create server")
  .action((port, host) => {
      // create server
      createCommands.createServer(port, host)
  });

program.parse(process.argv);
