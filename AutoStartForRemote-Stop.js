
const { spawn } = require('child_process');
CheckInvoice = require("./check-invoice").checkInvoiceGenerated;
remoteStop = require("./remote-start-stop/remote-stop").triggerRemoteStop;


let flag = true;
var transID;
// const startDatetime = new Date();

describe('-----Test Case-----', function () {
    it('-----Auto-Start-RemoteStop------', function (done) {
        startSimulator();

        function startSimulator() {
            const child = spawn('bash', ['AutoStartForRemoteStop/start-simulator.sh']);

            child.stdout.on('data', (chunk) => {
                chunk = chunk.toString();
                console.log(`sim says: ${chunk}`);

                if (chunk.includes("Waiting for Remote Stop")) {
                    remoteStop(transID);
                    done();
                }

                if (chunk.includes("transactionId") && flag === true) {
                    transID = chunk.split("transactionId: ")[1].split(" }")[0];
                    flag = false;
                    console.log(transID);
                }

            });

        }

    })
})
