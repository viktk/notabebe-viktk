const client = require('../client');

const commentDataMapper = {

    async findAll() {
        const result = await client.query('SELECT "comment".*, "child"."first_name" FROM "comment" JOIN "child" ON "comment"."child_id" = "child"."id" ORDER BY created_at DESC');
        return result.rows;
    },

    async findById(id) {
        const result = await client.query('SELECT * FROM "comment" WHERE id = $1', [id]);
        return result.rows[0];
    },

    async findByChildId(id) {
        const result = await client.query('SELECT * FROM "comment" WHERE child_id = $1', [id]);
        return result.rows;
    },

    async findByParentId(id) {
        const result = await client.query('SELECT * FROM "comments_with_parent" WHERE user_id = $1', [id]);
        return result.rows;
    },

    async add(data, id) {
        const result = await client.query('INSERT INTO "comment" (message, child_id) VALUES ($1, $2) RETURNING *', [data.message, id]);
        return result.rows[0];
    },

    async modify(comment, id) {
        const result = await client.query('UPDATE "comment" SET message = $1, child_id = $2, updated_at = now() WHERE id = $3 RETURNING *', [comment.message, comment.child_id, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await client.query('DELETE FROM "comment" WHERE id = $1', [id]);
        return result;
    }

};

module.exports = commentDataMapper;