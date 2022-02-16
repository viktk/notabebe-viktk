const { commentDataMapper, userDataMapper } = require('../dataMappers');

const commentController = {

    /**
     * Getting all comments
     * @param {Object} _ request not used
     * @param {Array} response array of objects from express middleware
     * @returns 
     */
    getAllComments: async (_, response, next) => {
        try {
            const comments = await commentDataMapper.findAll();

            // if there is data, we respond with it; if not, we return next()
            if (comments) {
                response.status(200).json(comments);
            } else {
                return next();
            };
        } catch {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Getting a comment by its id
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getCommentById: async (request, response, next) => {
        try {
            // get comment id from url
            const commentId = Number(request.params.id);

            // in case the comment id isn't a number, we return next()
            if (isNaN(commentId)) {
                return next();
            };

            // find a comment by its id
            const comment = await commentDataMapper.findById(commentId);

            // if there is data, we respond with it; if not, we return next()
            if (comment) {
                response.status(200).json(comment);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Getting all comments by a child id
     * @param {Object} request 
     * @param {Array} response array of objects from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getCommentsByChildId: async (request, response, next) => {
        try {
            // get child id from url
            const childId = Number(request.params.childId);

            // in case the child id isn't a number, we return next()
            if (isNaN(childId)) {
                return next();
            };

            // find comments by child id
            const data = await commentDataMapper.findByChildId(childId);

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
     * Getting all comments by a parent id
     * @param {Object} request 
     * @param {Array} response array of objects from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    getCommentsByParentId: async (request, response, next) => {
        try {
            // get parent id from url
            const parentId = Number(request.params.parentId);

            // in case the parent id isn't a number, we return next()
            if (isNaN(parentId)) {
                return next();
            };

            // find comments by parent id
            const comments = await commentDataMapper.findByParentId(parentId);

            // if there is data, we respond with it; if not, we return next()
            if (comments) {
                response.status(200).json(comments);
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Adding a comment
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    addComment: async (request, response, next) => {
        try {
            // create new data with request.body
            const newData = request.body;

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

            // find child according to parent
            const childLinkedToParent = await userDataMapper.findChildFromParent(parentId, childId);

            // in case we can't find the child linked to their parent, we return next()
            if (!childLinkedToParent) {
                return next();
            };

            // add a new comment thanks to request.body and child id
            const newComment = await commentDataMapper.add({ ...newData }, childId);

            // if there is no newComment, we return next()
            if (!newComment) {
                return next();
            };

            // if all goes well, we respond with the new comment
            response.status(201).json({ data: newComment });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Modifying a comment
     * @param {Object} request 
     * @param {Object} response object from express middleware
     * @param {Object} next not found resource middleware
     * @returns 
     */
    modifyComment: async (request, response, next) => {
        try {
            // create new data with request.body
            const newData = request.body;

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

            // get comment id from url
            const commentId = Number(request.params.commentId);

            // in case the comment id isn't a number, we return next()
            if (isNaN(commentId)) {
                return next();
            };

            // find child according to parent
            const childLinkedToParent = await userDataMapper.findChildFromParent(parentId, childId);

            // in case we can't find the child linked to their parent, we return next()
            if (!childLinkedToParent) {
                return next();
            };

            // modify comment thanks to new data and comment id
            const modifiedComment = await commentDataMapper.modify({ ...newData }, commentId);

            // if there is no modifiedComment, we return next()
            if (!modifiedComment) {
                return next();
            };

            // if all goes well, we respond with the modified comment
            response.status(200).json({ modifiedComment });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    },

    /**
     * Deleting a comment
     * @param {Object} request 
     * @param {String} response string to confirm deletion
     * @param {Object} next not found resource middleware
     * @returns 
     */
    deleteComment: async (request, response, next) => {
        try {

            // get parent id from url
            const parentId = Number(request.params.id);

            // in case the child id isn't a number, we return next()
            if (isNaN(parentId)) {
                return next();
            };

            // get child id from url
            const childId = Number(request.params.childId);

            // in case the child id isn't a number, we return next()
            if (isNaN(childId)) {
                return next();
            };

            // get comment id from url
            const commentId = Number(request.params.commentId);

            // in case the comment id isn't a number, we return next()
            if (isNaN(commentId)) {
                return next();
            };

            // find child according to parent
            const childLinkedToParent = await userDataMapper.findChildFromParent(parentId, childId);

            // in case we can't find the child linked to their parent, we return next()
            if (!childLinkedToParent) {
                return next();
            };

            // delete comment thanks to its id
            const result = await commentDataMapper.delete(commentId);

            // this check is to ensure we can't delete a comment twice; we return next() if there is no result
            if (result.rowCount > 0) {
                response.status(200).json('Commentaire bien supprimé');
            } else {
                return next();
            };

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        };
    }

};

module.exports = commentController;