const serialport = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new serialport('/dev/cu.usbmodem62045401', {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: '\n'}));

//Read the port data
port.on('open', () => {
    console.log('serial port open. data rate: ' + port.baudRate);
});

parser.on('data', data => {
    console.log('got word from arduino:', data);
})

port.on('close', () => {
    console.log('port closed.');
})

port.on('error', () => {
    console.log('Serial port error:' + error);
})

port.write("B");