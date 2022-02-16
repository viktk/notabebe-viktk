const client = require('../client');

const adminDataMapper = {

    async countEmail(email) {
        const result = await client.query('SELECT COUNT(*) FROM "user" WHERE email = $1', [email]);
        return result.rows[0];
    },

    async insertOne(data) {
        const result = await client.query('INSERT INTO "user" (first_name, last_name, address, postcode, city, email, password, phone_number, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [data.first_name, data.last_name, data.address, data.postcode, data.city, data.email, data.password, data.phone_number, data.role_id]);

        return result.rows[0];
    },

    async addChild(data, parentId) {

        const result = await client.query('INSERT INTO "child" (first_name, last_name, birthdate, birthplace, sex, allergies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [data.first_name, data.last_name, data.birthdate, data.birthplace, data.sex, data.allergies]);

        // the new child id is created
        const childId = result.rows[0].id;

        // the query is returning the user_id which is linked to child_id
        const result2 = await client.query('INSERT INTO "user_has_child" (user_id, child_id) VALUES ($1, $2) RETURNING *', [parentId, childId]);

        return result.rows[0];
    },

    async modifyChild(child, id) {
        let query = `UPDATE "child" SET `;
        const values = [];

        const keys = Object.keys(child);

        for (let i = 0; i < keys.length; i++) {
            query += `"${keys[i]}" = $${i + 1}, `;
            values.push(child[keys[i]]);
        };

        query += `updated_at = now() WHERE id = $${keys.length + 1} RETURNING *;`;
        values.push(id);

        const result = await client.query(query, values);

        return result.rows[0];
    },

    async deleteUser(id) {
        const result = await client.query('DELETE FROM "user" WHERE id = $1', [id]);
        return result;
    },

    //TODO si on a le temps : factoriser le tablename pour qu'on puisse utiliser la même méthode pour toutes les suppressions


    async deleteChild(id) {
        const result = await client.query('DELETE FROM "child" WHERE id = $1', [id]);
        return result;
    }

};

module.exports = adminDataMapper;