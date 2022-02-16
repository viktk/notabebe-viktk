const bcrypt = require('bcrypt');

const { adminDataMapper, userDataMapper } = require('../dataMappers');

const adminController = {

    /**
     * Adding a user
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    addUser: async (request, response, next) => {
        try {
            // get password from request.body
            const password = request.body.password;

            // hash password
            const hash = bcrypt.hashSync(password, 10);

            // insert user with newly hashed password
            const newUser = await adminDataMapper.insertOne({
                ...request.body,
                password: hash
            });

            // if there is no newUser, we return next(), which sends an error message and a 404 status
            if (!newUser) {
                return next();
            };

            // if all goes well, we respond with the newly inserted user
            response.status(201).json({ data: newUser });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Deleting a user
     * @param {Object} request 
     * @param {String} response string to confirm deletion
     * @param {Object} next not found resource middleware
     * @returns 
     */
    deleteUser: async (request, response, next) => {
        try {
            // get id from url
            const id = Number(request.params.id);

            // in case the id isn't a number, we return next()
            if (isNaN(id)) {
                return next();
            };

            // delete user thanks to their id
            const result = await adminDataMapper.deleteUser(id);

            // this check is to ensure we can't delete a user twice; we return next() if there is no result
            if (result.rowCount > 0) {
                response.status(200).json('User bien supprimé');
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Adding a child
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    addChild: async (request, response, next) => {
        try {
            // get parent id from url
            const parentId = Number(request.params.id);

            // in case the parent id isn't a number, we return next()
            if (isNaN(parentId)) {
                return next();
            };

            // add a new child thanks to request.body and parent's id
            const newChild = await adminDataMapper.addChild((request.body), parentId);

            // if there is no newChild, we return next()
            if (!newChild) {
                return next();
            };

            // if all goes well, we respond with the newly inserted child
            response.status(201).json({ data: newChild });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Getting a child by their id
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getChildById: async (request, response, next) => {

        try {
            // get child id from url
            const childId = Number(request.params.id);

            // in case the child id isn't a number, we return next()
            if (isNaN(childId)) {
                return next();
            };

            // find child by id thanks to request params
            const data = await userDataMapper.findChildById(childId);

            // if the child is found, we respond with their info; if not, we return next()
            if (data) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }
    },

    /**
     * Deleting a child
     * @param {Object} request 
     * @param {String} response string to confirm deletion
     * @param {Object} next not found resource middleware
     * @returns 
     */
    deleteChild: async (request, response, next) => {
        try {

            // find parent id from url
            const parentId = Number(request.params.id);

            // in case the parent id isn't a number, we return next()
            if (isNaN(parentId)) {
                return next();
            };

            // find child id from url
            const childId = Number(request.params.childId);

            // in case the child id isn't a number, we return next()
            if (isNaN(childId)) {
                return next();
            };

            // find child according to their parent
            const child = await userDataMapper.findChildFromParent(parentId, childId);

            // in case no child is found, we return next()
            if (!child) {
                return next();
            };

            // delete child thanks to their id
            const result = await adminDataMapper.deleteChild(childId);

            // this check is to ensure we can't delete a child twice; we return next() if there is no result
            if (result.rowCount > 0) {
                response.status(200).json('Enfant bien supprimé de la plateforme');
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    }
};

module.exports = adminController;