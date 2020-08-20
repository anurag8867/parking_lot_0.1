const server = require('./server');
let Server = new server();

(function () {
    require('fs').readFileSync('./functional_spec/fixtures/file_input.txt', 'utf-8').split(/\r?\n/)
        .forEach(function (cmd) {
            executeCommands(cmd)
        });
})();

/**
 * This function will execute the command by calling the server function
 * @param {} cmd 
 */
function executeCommands(cmd) {
    let command, args;
    [command, ...args] = cmd.split(' ');
    Server.run(command, args);
}

console.log = function () { }
