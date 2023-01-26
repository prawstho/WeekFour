const fs = require('fs');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();

// load the logEvents module
const logEvents = require('./logEvents');

myEmitter.addListener('route', (event, level, msg) => {
    const d = new Date();
    console.log(d.toLocaleString() + ' * ' + level.toUpperCase() + ' * ' + msg);
    logEvents(event, level.toUpperCase() , msg);
});

// this is the index page
function indexPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'information', 'the home page was visited.');
}

//this is the about page
function aboutPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'information', 'the about page was visited.');
}

function contactPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'information', 'the contact page was visited.');
}

function subscribePage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'information', 'the subscribe page was visited.');
}

function synchronous(path, event, response) {
    let readName = path + 'readMe.txt';
    let readMe = fs.readFileSync(readName, 'utf8')
    myEmitter.emit('route', event, 'success', `${readName} file was successfully read.`);
    response.writeHead(response.statusCode, {'Content-Type': 'text/plain'});
    response.write(`${readName} file was successfully read.`);

    let writeName = path + 'writeMe.txt';
    fs.writeFileSync(writeName, readMe);
    myEmitter.emit('route', event, 'success', `${writeName} file was successfully written.`);
    response.write(`\n${writeName} file was successfully written.`);
    response.end();
}

function asynchronous(path, event, response) {
    let readName = path + 'readMe.txt';
    fs.readFile(readName, 'utf8', function(err, readMe) {
        if(err) { 
            myEmitter.emit('route', event, 'failure', `${readName} file was not read.`);
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write(`${readName} file was NOT read.`);
        }
        else {
            let writeName = path + 'writeMe.txt';
            fs.writeFile(writeName, readMe, function(err) {
                if(err) { 
                    myEmitter.emit('route', event, 'failure', `${writeName} file was not written.`);
                    response.writeHead(404, {'Content-Type': 'text/plain'});
                    response.write(`${writeName} file was NOT written.`);
                }
                else {
                    myEmitter.emit('route', event, 'success', `${readName} file was successfully read.`);
                    response.write(`${readName} file was successfully written.`);
                    myEmitter.emit('route', event, 'success', `${writeName} file was successfully written.`);
                    response.write(`\n${writeName} file was successfully written.`);                }
            });
        }
        response.end();
    })  
}

function fourOfourPage(path, event, response) {
    displayFile(path, response);
    myEmitter.emit('route', event, 'error', 'a routing error occured for the ' +  event + ' route.');
}

function displayFile(path, response) {
    fs.readFile(path, function(err, data) {
        if(err) {
            console.log(err);
            response.end();
        } else {
            //console.log('file was served.')
            response.writeHead(response.statusCode, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        };   
    });
};

module.exports = {
    indexPage,
    aboutPage,
    contactPage,
    subscribePage,
    fourOfourPage,
    synchronous,
    asynchronous,
}