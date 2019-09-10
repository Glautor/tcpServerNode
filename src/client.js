var readline = require('readline');

// USE ESSES DADOS PARA SE CONECTAR NO SERVER DO PROJETO
var port = 8124;
var host = 'localhost';
var command = 'REQNUM';
const net = require('net');

var sequence = 0;
var count = 0;

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function questions() {
    leitor.question('Selecione a porta para se conectar: ', (portReceived) => {
        port = portReceived;
        leitor.question('Selecione o host para se conectar: ', (hostReceived) => {
            host = hostReceived;
            setCommand();
        })
    })
}

async function setCommand() {
    await setInterval(() => {}, 1000);
    leitor.question('Digite REQNUM, UPTIME ou CLOSE: ', (commandReceived) => {
        sequence = 0;
        command = commandReceived;
        clientServer();
    })
}

var client = '';

async function clientServer() {
    if(client == '') {
        client = net.createConnection({ port, host }, async () => {});
    }

    await client.write(command);

    if(command == 'CLOSE') {
        await client.end();
        await leitor.close();
        setInterval(() => {
            process.exit(0);
        }, 1000);
    }

    await client.on('data', (data) => {
        var message = data.toString().split(' ');

        if (message[1] == 'UPTIME') {
            if(sequence == 0) {
                console.log(message[0] + ' segundos');
                sequence++;
            }
        } else if (message[1] == 'REQNUM') {
            if(sequence == 0) {
                console.log(message[0] + ' conexões');
                sequence++;
            }
        }
        if(count == 0) {
            setCommand();
        }
    });
}

questions();