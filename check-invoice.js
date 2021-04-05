const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = require("chai");



module.exports.checkInvoiceGenerated = function (startDatetime, endDatetime, transID) {
    describe('checking-invoice-for-current-time-after-the-self-remote-stop', () => {
        it('check invoice', (done) => {
            // setTimeout(() => {
                return chai.request('https://testcms1.numocity.com:4003/')
                    .get('transaction/get/v1?fromDate=Mon%20Apr%2005%202021%2001:01:01%20GMT+0530%20(India%20Standard%20Time)&toDate=Mon%20Apr%2005%202021%2023:59:59%20GMT+0530%20(India%20Standard%20Time)')
                    .set('content-type', 'application/json')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        console.log(`got ${res.body.Document.length} total sessions`);
                        const todaysSession = res.body.Document.filter((session) => {
                            endDatetime = new Date();
                            return endDatetime > startDatetime && session.CPID.startsWith('Testcharge001');
                        });
                        console.log(`${todaysSession.length} of them are for Testcharge001`);
                        const ActTransID = todaysSession[0].TransactionID;
                        const ActTID = ActTransID.toString();

                        console.log(`Recent Transaction ID : ${ActTID}`);
                        expect(ActTID).to.be.equal(transID);
                        done();
                    })
            // }, 100000);
        })
    })

}

