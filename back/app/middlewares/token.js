const userDataMapper = require('../dataMappers/user');

const jsonwebtoken = require('jsonwebtoken');

const checkTokenMiddleware = {

    async checkToken(request, response) {
        const authHeader = request.headers['authorization'];
        //Si on a un authHeader, alors on renvoie le second paramètre de authHeader (qui est le token), sinon undefined
        const token = authHeader && authHeader.split(' ')[1];
        //Si pas de token, alors on renvoie un statut 401 => Unauthorized (pas de token, pas d'autorisation)
        if (token == null) return response.sendStatus(401);
        //Si on a un token, alors on le vérifie
        //La fonction verify prend en paramètre le token à vérifier, et la clé utilisée pour le générer
        //Elle prend en paramètre également un callback pour traiter le résultat
        jsonwebtoken.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
            //Si il y a une erreur, on envoie un statut 403 qui signifie que le token n'est pas ou plus valide
            if (error) return response.sendStatus(403);
            //Si pas d'erreur, alors on va chercher le user correspondant au name et on renvoie le JSON
            const user = await userDataMapper.findById(decoded.email);
            // Pour des raisons de sécurité, on supprime le mot de passe avant de renvoyer les infos du compte
            delete user.password;
            // On envoie l'information indiquant le statut de connexion de l'utilisateur
            user.logged = true;
            response.json({ user });
        });
    }

};

module.exports = checkTokenMiddleware;