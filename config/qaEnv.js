export default {
    remoteStartbaseURL: 'https://testcms1.numocity.com:9091/',

    //Need to change the chargepoint ID at the end to trigger particular CP transctions
    remoteStartURIandCPID : 'api/v2/ocpp/remotetransaction/start/Testcharge001',

    //Base url of transactions api
    invoiceBaseURL: 'https://testcms1.numocity.com:4003/',

    //Range to be mentioned for required transactions using below parameters
    //FromDate
    startDate : '06',
    startDay : 'Tue',
    startMonth : 'Apr',
    //ToDate
    endDate : '06',
    endDay : 'Tue',
    endMonth : 'Apr',

    invoiceURI : `transaction/get/v1?fromDate=${startDay}%20${startMonth}%20${startDate}%202021%2001:01:01%20GMT+0530%20(India%20Standard%20Time)&toDate=${endDay}%20${endMonth}%20${endDate}%202021%2023:59:59%20GMT+0530%20(India%20Standard%20Time)`

}