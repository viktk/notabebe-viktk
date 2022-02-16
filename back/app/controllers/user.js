const { userDataMapper } = require('../dataMappers');

const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

const userController = {

    /**
     * Getting all users
     * @param {Object} _ request not used
     * @param {Array} response array of objects from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getAllUsers: async (_, response, next) => {
        try {
            const data = await userDataMapper.findAll();

            // if there is data, we respond with it; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };

    },

    /**
     * Getting all parents
     * @param {Object} _ request not used
     * @param {Array} response array of objects from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getAllParents: async (_, response, next) => {
        try {
            const data = await userDataMapper.findAllParents();

            // if there is data, we respond with it; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Getting a parent by their id as well as their children
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getParentById: async (request, response, next) => {
        try {
            // get parent id from url
            const parentId = Number(request.params.id);

            // get all of one parent's children - thanks to a sql view, we get infos about the parent and infos about their children
            const data = await userDataMapper.findChildrenByParent(parentId);

            // if there is data, we respond with it; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Getting a child from their parent
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getChildFromParent: async (request, response, next) => {
        try {
            // get parent id from url
            const parentId = Number(request.params.id);

            // in case the parent id isn't a number, we return next()
            if (isNaN(parentId)) {
                return next();
            };

            // get child id from url
            const childId = Number(request.params.childId);

            // in case the child id isn't a number, we return next()
            if (isNaN(childId)) {
                return next();
            };

            // find child by parent (with both ids)
            const data = await userDataMapper.findChildFromParent(parentId, childId);

            // if there is data, we respond with it; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Getting all staff members
     * @param {Object} _ request not used
     * @param {Array} response array of objects from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getAllStaff: async (_, response, next) => {
        try {
            const data = await userDataMapper.findAllStaff();

            // if there is data, we respond with it; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };

    },

    /**
     * Getting a staff member by their id
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getStaffById: async (request, response, next) => {
        try {
            // get staff id from url
            const staffId = Number(request.params.id);

            // in case the staff id isn't a number, we return next()
            if (isNaN(staffId)) {
                return next();
            };

            // find staff by id
            const data = await userDataMapper.findStaffById(staffId);

            // if there is data, we respond with it; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Getting all children
     * @param {Object} _ request not used
     * @param {Array} response array of objects from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getAllChildren: async (_, response, next) => {
        try {
            const data = await userDataMapper.findAllChildren();

            // if there is data, we respond with it; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Checking that the login information entered by the user is correct and validate login form
     * 
     * @param {Object} request 
     * @param {Object} response object from express middleware
     */
    checkLogin: async (request, response) => {
        try {
            // get the email from the request.body
            const email = request.body.email;

            // get the password from the request.body
            const password = request.body.password;

            // using emailValidator to check if the email is a valid one
            if (!emailValidator.validate(request.body.email)) {
                return response.status(400).json({ error: "Cet email n'est pas valide." });
            };

            // find the user by their email
            const user = await userDataMapper.findOne(email);

            // in case the user is null, we send an error
            if (user === null) {
                response.status(400).json({ error: "Email ou mot de passe incorrect" });
                return;
            };

            // check if password is valid thanks to bcrypt's compare function
            const pwResult = bcrypt.compareSync(password, user.password);

            // if the password comparison is correct, we move on to the next step
            if (pwResult) {

                // if there is a user, we move on to the next step; if not, we send an error
                if (user) {

                    // we create a jsonwebtoken in order to send information to the client
                    const jwtContent = { userId: user.id, roleId: user.role_id, firstName: user.first_name, lastName: user.last_name };

                    // we pick the algorithm and the duration
                    const jwtOptions = {
                        algorithm: 'HS256',
                        expiresIn: '3h'
                    };

                    // we send a token with the information that the client needs
                    response.status(200).json({
                        logged: true,
                        email: user.email,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        roleId: user.role_id,
                        token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
                    });
                } else {
                    response.status(401).json(`401 unauthorized`);
                };

            } else {
                // if the bcrypt password comparison is incorrect, we send an error message
                response.status(401).json({ error: "Mot de passe incorrect" });
            };
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Logging the user out, deleting their session
     * 
     * @param {*} request 
     * @param {Redirect} response redirect to / after logout
     */
    logout: (request, response) => {
        request.session.destroy();
        response.redirect('/');
    },

    /**
     * Checking old password and updating user password (+ hashing it)
     * @param {Object} request 
     * @param {Redirect} response redirecting the user to / and saving them in a session
     */
    updatePassword: async (request, response) => {
        try {
            // find user id from url
            const userId = Number(request.params.id);

            // in case the user id isn't a number, we return next()
            if (isNaN(userId)) {
                return next();
            };

            // get the old password from the request.body
            const oldPassword = request.body.oldPassword;

            // get the user from their id
            const user = await userDataMapper.findById(userId);

            // compare old password (entered by the user) and the password in the database
            const compareHash = bcrypt.compareSync(oldPassword, user.password);

            // if the two passwords match, we move on to the next step
            if (compareHash) {

                // we get the new password from what the user enters in the request.body
                const newPassword = request.body.password;

                const errors = [];

                // if the old password and the new password match, we send an error
                if (oldPassword === newPassword) {
                    errors.push("Le nouveau mot de passe doit être différent de l'ancien.");
                };

                // checking string length
                if (newPassword.length === 0) {
                    errors.push("Le mot de passe est obligatoire");
                };

                if (errors.length > 0) {
                    // if there is at least one error, we want it to show up in the json response
                    response.json({ error: errors });
                    return;
                };

                // hash the password with bcrypt
                const hash = bcrypt.hashSync(newPassword, 10);

                // save the data into the database
                const user = await userDataMapper.updatePassword(hash, userId);

                // connect the user (save into a session)
                request.session.user = user;

                response.status(200).json("Mot de passe bien modifié");

            } else {
                response.status(401).json("L'ancien mot de passe est invalide. Veuillez réessayer.");
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Updating user info
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     */
    updateUser: async (request, response, next) => {
        try {
            // get the user id from url
            const userId = Number(request.params.id);

            // in case the user id isn't a number, we return next()
            if (isNaN(userId)) {
                return next();
            };

            // find user by their id
            const user = await userDataMapper.findById(userId);

            // if there is no user, we return next()
            if (!user) {
                return next();
            };

            // create new data with request.body
            const newData = request.body;

            // modify child thanks to new data and user id
            const updatedUser = await userDataMapper.updateUser({ ...newData }, userId);

            // save the newly updated user in a session
            request.session.user = updatedUser;

            // if all goes well, we respond with the modified user
            response.status(200).json({ updatedUser });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Modifying a child
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    modifyChild: async (request, response, next) => {
        try {
            // get parent id from url
            const parentId = Number(request.params.id);

            // in case the parent id isn't a number, we return next()
            if (isNaN(parentId)) {
                return next();
            };

            // get child id from url
            const childId = Number(request.params.childId);

            // in case the child id isn't a number, we return next()
            if (isNaN(childId)) {
                return next();
            };

            // find child from parent id
            const child = await userDataMapper.findChildFromParent(parentId, childId);

            // if there is no child, we return next()
            if (!child) {
                return next();
            };

            // create new data with request.body
            const newData = request.body;

            // modify child thanks to new data and child id
            const updatedChild = await userDataMapper.modifyChild({ ...newData }, childId);

            response.status(200).json({ updatedChild });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    }
};

module.exports = userController;