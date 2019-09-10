const net = require('net');

const port = 8124;
const host = 'localhost';

var count = 0;
var seconds = 0;
setInterval(() => {
  seconds++;
}, 1000);

const server = net.createServer((c) => {
    console.log('cliente conectado');
    count++;
    c.on('data', (data) => {
        if (data.toString() == 'REQNUM') {
            c.write(`${count} REQNUM`);
        } else if (data.toString() == 'UPTIME') {
            c.write(`${seconds} UPTIME`);
        }
    });

    c.on('end', () => {
        console.log('client disconnected');
        count--;
    });
});

server.on('error', (err) => {
  throw err;
});

server.listen(port, host, () => {
  console.log('server rodando em ', server.address());
});