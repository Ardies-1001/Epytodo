const mysql = require('mysql2/promise');
// Ici on écris les constantes des variables d'environnement 
// Ce code établit une connexion à une base de données MySQL en utilisant les valeurs stockées dans les variables d'environnement.
// Et la variable d'environement en question est à la racine du projet et est .env
const databaseConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD
});

module.exports = databaseConnection;
