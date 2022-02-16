const { recapDataMapper } = require('../dataMappers');
const { getChildFromParent } = require('./user');

const recapController = {

    /**
     * Getting all recaps
     * @param {Object} _ request not used
     * @param {Array} response array of objects from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getAllRecaps: async (_, response, next) => {
        try {
            const recaps = await recapDataMapper.findAll();

            // if there is data, we respond with it; if not, we return next()
            if (recaps) {
                response.status(200).json(recaps);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Getting a recap by its id
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getRecapById: async (request, response, next) => {
        try {
            // get recap id from url
            const recapId = Number(request.params.id);

            // in case the comment id isn't a number, we return next()
            if (isNaN(recapId)) {
                return next();
            };

            // find a recap by its id
            const data = await recapDataMapper.findById(recapId);

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
     * Getting recaps by a child id
     * @param {Object} request 
     * @param {Array} response array of objects from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getRecapsByChildId: async (request, response, next) => {
        try {
            // get child id from url
            const childId = Number(request.params.childId);

            // in case the child id isn't a number, we return next()
            if (isNaN(childId)) {
                return next();
            };

            // find recaps by child id
            const data = await recapDataMapper.findByChildId(childId);

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
     * Adding a recap
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    addRecap: async (request, response, next) => {
        try {
            // create new recap with request.body
            const newRecap = await recapDataMapper.addRecap(request.body);

            // if there is no newRecap, we return next()
            if (!newRecap)
                return next();

            // get recap id from newly created recap
            const recapId = newRecap.id;

            // we have to check if there are naps in the request.body
            // in case there are naps, we use a loop to add a single nap to the recap
            if (request.body.naps && request.body.naps !== null) {
                for (const nap of request.body.naps) {
                    await recapDataMapper.addNap(nap, recapId);
                };
            };

            // we have to check if there are meals in the request.body
            // in case there are meals, we use a loop to add a single meal to the recap
            if (request.body.meals && request.body.meals !== null)
                for (const meal of request.body.meals) {
                    await recapDataMapper.addMeal(meal, recapId);
                };

            // then we find the recap by its id
            const recapToAdd = await recapDataMapper.findById(recapId);

            // and we respond with it
            response.status(201).json(recapToAdd);

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };

    },

    /**
     * Adding a nap to a recap
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    addNap: async (request, response, next) => {
        try {
            // get recap id from url
            const recapId = request.params.recapId;

            // in case the recap id isn't a number, we return next()
            if (isNaN(recapId)) {
                return next();
            };

            // add a new nap thanks to request.body and recap id
            const newNap = await recapDataMapper.addNap({ ...request.body }, recapId);

            // if there is no newNap, we return next()
            if (!newNap) {
                return next();
            };

            // if all goes well, we respond with the new nap
            response.status(201).json({ data: newNap });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Adding a meal to a recap
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    addMeal: async (request, response, next) => {
        try {
            // get recap id from url
            const recapId = request.params.recapId;

            // in case the recap id isn't a number, we return next()
            if (isNaN(recapId)) {
                return next();
            };

            // add a new meal thanks to request.body and recap id
            const newMeal = await recapDataMapper.addMeal({ ...request.body }, recapId);

            // if there is no newMeal, we return next()
            if (!newMeal) {
                return next();
            };

            // if all goes well, we respond with the new meal
            response.status(201).json({ data: newMeal });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Modifying a recap
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    modifyRecap: async (request, response, next) => {
        try {
            // get recap id from url
            const recapId = Number(request.params.recapId);

            // in case the recap id isn't a number, we return next()
            if (isNaN(recapId)) {
                return next();
            };

            // find a recap by its id
            const recap = await recapDataMapper.findById(recapId);

            // if there is no recap, we return next()
            if (!recap) {
                return next();
            };

            // get the whole request.body
            const newData = request.body;

            // get only naps from the request.body
            const naps = request.body.naps;

            // get only meals from the request.body
            const meals = request.body.meals;

            // modify recap thanks to new data, recap id, naps and meals
            const updatedRecap = await recapDataMapper.modifyEntireRecap({ ...newData }, recapId, [...naps], [...meals]);

            // if all goes well, we respond with the modified recap
            response.status(200).json({ updatedRecap });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };

    },

    /**
     * Modifying a nap
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    modifyNap: async (request, response, next) => {
        try {
            // find recap id from url
            const recapId = Number(request.params.recapId);

            // in case the recap id isn't a number, we return next()
            if (isNaN(recapId)) {
                return next();
            };

            // find nap id from url
            const napId = Number(request.params.napId);

            // in case the nap id isn't a number, we return next()
            if (isNaN(napId)) {
                return next();
            };

            // find the recap by its id
            const recap = await recapDataMapper.findById(recapId);

            // if there is no recap, we return next()
            if (!recap) {
                return next();
            };

            // get the whole request.body
            const newData = request.body;

            // modify nap thanks to new data and nap id
            const updatedNap = await recapDataMapper.modifyNap({ ...newData }, napId);

            // if all goes well, we respond with the updated nap
            response.status(200).json({ updatedNap });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Modifying a meal
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */

    modifyMeal: async (request, response, next) => {
        try {
            // get recap id from url
            const recapId = Number(request.params.recapId);

            // in case the recap id isn't a number, we return next()
            if (isNaN(recapId)) {
                return next();
            };

            // get meal id from url
            const mealId = Number(request.params.mealId);

            // in case the meal id isn't a number, we return next()
            if (isNaN(mealId)) {
                return next();
            };

            // find recap by its id
            const recap = await recapDataMapper.findById(recapId);

            // if there is no recap, we return next()
            if (!recap) {
                return next();
            };

            // create new data with request.body
            const newData = request.body;

            // modify meal thanks to new data and meal id
            const updatedMeal = await recapDataMapper.modifyMeal({ ...newData }, mealId);

            // if all goes well, we respond with the modified comment
            response.status(200).json({ updatedMeal });
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Deleting a recap
     * @param {Object} request 
     * @param {String} response string to confirm deletion
     * @param {Object} next not found resource middleware
     * @returns 
     */
    deleteRecap: async (request, response, next) => {
        try {

            // find recap id from url
            const recapId = Number(request.params.recapId);

            // in case the recap id isn't a number, we return next()
            if (isNaN(recapId)) {
                return next();
            };

            // delete recap thanks to its id
            const result = await recapDataMapper.deleteRecap(recapId);

            // this check is to ensure we can't delete a recap twice; we return next() if there is no result
            if (result.rowCount > 0) {
                response.status(200).json('Récap bien supprimé');
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Deleting a nap
     * @param {Object} request 
     * @param {String} response string to confirm deletion
     * @param {Object} next not found resource middleware
     * @returns 
     */
    deleteNap: async (request, response, next) => {
        try {
            // get nap id from url
            const napId = request.params.napId;

            // in case the nap id isn't a number, we return next()
            if (isNaN(napId)) {
                return next();
            };

            // delete nap thanks to its id
            const result = await recapDataMapper.deleteNap(napId);

            // this check is to ensure we can't delete a nap twice; we return next() if there is no result
            if (result.rowCount > 0) {
                response.status(200).json('Sieste bien supprimée');
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Deleting a meal
     * @param {Object} request 
     * @param {String} response string to confirm deletion
     * @param {Object} next not found resource middleware
     * @returns 
     */
    deleteMeal: async (request, response, next) => {
        try {
            // get meal id from url
            const mealId = request.params.mealId;

            // in case the meal id isn't a number, we return next()
            if (isNaN(mealId)) {
                return next();
            };

            // delete meal thanks to its id
            const result = await recapDataMapper.deleteMeal(mealId);

            // this check is to ensure we can't delete a meal twice; we return next() if there is no result
            if (result.rowCount > 0) {
                response.status(200).json('Repas bien supprimé');
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },


    /**
     * Getting all recaps for a child by its id and parents id
     * @param {Objet} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found middleware
     * @returns 
     */
    getAllRecapsByOneChild: async (request, response, next) => {
        try{
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

            // find recap by parent and child (with both ids)
            const data = await recapDataMapper.findByChildIdAndParentId(parentId, childId);


            // if there is data, we respond with it; if not, we return next()
            if (data [0]) {
                response.status(200).json(data);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
        
    }
};

module.exports = recapController;