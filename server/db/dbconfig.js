const config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'Kumarc@2004',
    server: process.env.DB_HOST || 'db',
    database: process.env.DB_NAME || 'MTL_Project',
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        trustServerCertificate: true
    },
    port : 1433
}

module.exports = config;
