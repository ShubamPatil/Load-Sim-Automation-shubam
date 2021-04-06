const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = chai;

const { spawn } = require('child_process');
CheckInvoice = require("./check-invoice").checkInvoiceGenerated;
var transID;
let flag = true;

// const startDatetime = new Date();



function startSimulator() {
    return new Promise((resolve) => {
        const child = spawn('bash', ['AutoStartForRemoteStop/start-simulator.sh']);

        child.stdout.on('data', (chunk) => {
            chunk = chunk.toString();
            console.log(`sim says: ${chunk}`);

            if (chunk.includes("Waiting for Remote Stop")) {
                resolve();
            }

            if (chunk.includes("transactionId") && flag === true) {
                transID = chunk.split("transactionId:")[1].split(",")[0];
                flag = false;
            }
        })

        child.stderr.on('data', (message) => {
            console.log(`sim err: ${message}`)
        })

    })
}

function triggerRemoteStop() {
    describe('remote-start-which-stops-by-itself.js', () => {
        it('RFID-REMOTE-START', (done) => {
            startSimulator().then(() => {
                return chai.request('https://testcms1.numocity.com:9091/')
                .get(`api/v2/ocpp/remotetransaction/stop/Testcharge001/${transID}`)
                .then((res) => {
                    expect(res).to.have.status(200);
                    done();
                })
            })           
        })
    })
}

triggerRemoteStop();