// Importe le module bcrypt pour le hachage des mots de passe
const bcrypt = require('bcryptjs');
// Importe le module jsonwebtoken pour la gestion des tokens JWT
const jwt = require('jsonwebtoken');
// Importe les fonctions insertUser et getUserPassword depuis le fichier user.query dans le répertoire routes/user
const { insertUser, getUserPassword } = require('../user/user.query');

// Fonction pour l'inscription d'un nouvel utilisateur
async function register(req, res) {
    // Récupère les données de la requête
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const firstname = req.body.firstname;
    // Expression régulière pour valider le format de l'email
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    // Vérifie si des paramètres obligatoires sont manquants ou si l'email est mal formaté
    if ([email, password, name, firstname].includes(undefined) === true || emailRegex.test(email) === false) {
        return res.status(400).json({ 'msg': 'Bad parameter' }); // Renvoie une erreur 400 si les paramètres sont incorrects
    }
    try {
        // Insère un nouvel utilisateur avec le mot de passe haché dans la base de données
        await insertUser(email, bcrypt.hashSync(password, 10), name, firstname);
    } catch(err) {
        return res.status(409).json({ 'msg': 'Account already exists' }); // Renvoie une erreur 409 si le compte existe déjà
    }
    // Génère un token JWT pour l'utilisateur nouvellement inscrit et le renvoie dans la réponse
    const token = jwt.sign({ email: email }, process.env.SECRET);
    return res.status(200).json({ token });
}

// Fonction pour la connexion d'un utilisateur existant
async function login(req, res) {
    // Récupère les données de la requête
    const email = req.body.email;
    const password = req.body.password;
    // Expression régulière pour valider le format de l'email
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    // Vérifie si des paramètres obligatoires sont manquants ou si l'email est mal formaté
    if ([email, password].includes(undefined) === true || emailRegex.test(email) === false) {
        return res.status(400).json({ 'msg': 'Bad parameter' }); // Renvoie une erreur 400 si les paramètres sont incorrects
    }
    // Récupère le mot de passe haché de l'utilisateur correspondant à l'email fourni
    const hashedPassword = await getUserPassword(email);
    // Vérifie si aucun utilisateur n'est trouvé avec cet email ou si le mot de passe est incorrect
    if (hashedPassword === false || bcrypt.compareSync(password, hashedPassword) === false) {
        return res.status(401).json({ 'msg': 'Invalid Credentials' }); // Renvoie une erreur 401 si les informations d'identification sont incorrectes
    }
    // Génère un token JWT pour l'utilisateur connecté et le renvoie dans la réponse
    const token = jwt.sign({ email: email }, process.env.SECRET);
    return res.status(200).json({ token });
}

// Exporte les fonctions register et login pour les rendre disponibles pour d'autres modules
module.exports = {
    register,
    login
};
