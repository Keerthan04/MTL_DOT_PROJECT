const config = {
    user: 'sa',
    password: 'password',
    server: '127.0.0.1',
    database: 'MTL_Project',
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        instancename: 'MSSQLSERVER',
        trustServerCertificate: true
    },
    port : 1433
}

module.exports = config;