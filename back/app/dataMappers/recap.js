const client = require('../client');

const recapDataMapper = {

    async findAll() {
        const result = await client.query('SELECT "recap_with_nap_and_meal".*, "child"."first_name", "child"."last_name" FROM "recap_with_nap_and_meal" JOIN "child" ON "recap_with_nap_and_meal"."child_id" = "child"."id" ORDER BY created_at DESC');
        return result.rows;
    },

    async findById(id) {
        const result = await client.query('SELECT * FROM "recap_with_nap_and_meal" WHERE id = $1', [id]);
        return result.rows[0];
    },

    async findByChildId(id) {
        const result = await client.query('SELECT * FROM "recap_with_nap_and_meal" WHERE child_id = $1', [id]);
        return result.rows;
    },

    async findByChildIdAndParentId(parentId, childId) {
        const result = await client.query('SELECT * FROM "recap_with_nap_and_meal" JOIN "parent_with_child" ON parent_with_child.pwc_child_id = recap_with_nap_and_meal.child_id WHERE pwc_user_id = $1 AND recap_with_nap_and_meal.child_id = $2', [parentId, childId]);
        return result.rows;
    },

    async addRecap(data) {
        const result = await client.query('INSERT INTO "recap" (date, extra_info, mood, child_id) VALUES ($1, $2, $3, $4) RETURNING *', [data.date, data.extra_info, data.mood, data.child_id]);
        return result.rows[0];
    },

    async addNap(data, id) {
        const result = await client.query('INSERT INTO "nap" (start_time, end_time, comment, recap_id) VALUES ($1, $2, $3, $4) RETURNING *', [data.start_time, data.end_time, data.comment, id]);
        return result.rows[0];
    },

    async addMeal(data, id) {
        const result = await client.query('INSERT INTO "meal" (time, comment, recap_id) VALUES ($1, $2, $3) RETURNING *', [data.time, data.comment, id]);
        return result.rows[0];
    },


    async modifyEntireRecap(recap, recapId, nap, meal) {

        const napsByRecap = await client.query('SELECT * FROM "nap" WHERE recap_id = $1', [recapId]);
        const napsByRecapResult = napsByRecap.rows;

        const mealsByRecap = await client.query('SELECT * FROM "meal" WHERE recap_id = $1', [recapId]);
        const mealsByRecapResult = mealsByRecap.rows;

        try {

            await client.query('BEGIN');
            let values1 = [];

            let query1 = 'UPDATE "recap" SET date = $1, extra_info = $2, mood = $3, child_id = $4, updated_at = now() WHERE id = $5 RETURNING *';

            values1 = [recap.date, recap.extra_info, recap.mood, recap.child_id, recapId];

            const updatedRecap = await client.query(query1, values1);
            let recapResult = updatedRecap.rows[0];

            let values2 = [];

            let napResult = [];
            let indexNap = 0;
            for (const n of nap) {
                let query2 = `UPDATE "nap" SET start_time = $1, end_time = $2, comment = $3, updated_at = now() WHERE id = $4 RETURNING *`;

                let napId = napsByRecapResult[indexNap].id;

                values2 = [n.start_time, n.end_time, n.comment, napId];

                let updatedNap = await client.query(query2, values2);

                napResult[indexNap] = updatedNap.rows[0];
                indexNap++;
            };

            recapResult.naps = napResult;

            let values3 = [];

            let mealResult = [];
            let indexMeal = 0;
            for (const m of meal) {
                let query3 = `UPDATE "meal" SET time = $1, comment = $2, updated_at = now() WHERE id = $3 RETURNING *`;

                let mealId = mealsByRecapResult[indexMeal].id

                values3 = [m.time, m.comment, mealId];

                let updatedMeal = await client.query(query3, values3);
                mealResult[indexMeal] = updatedMeal.rows[0];

                indexMeal++;
            }

            recapResult.meals = mealResult;

            await client.query('COMMIT');

            return recapResult;

        } catch (e) {

            await client.query('ROLLBACK');
            throw e;
        }
    },


    async modifyRecap(recap, id) {

        let query = `UPDATE "recap" SET `;

        const values = [];

        const keys = Object.keys(recap);

        for (let i = 0; i < keys.length; i++) {
            query += `"${keys[i]}" = $${i + 1}, `;
            values.push(recap[keys[i]]);
        }

        query += `updated_at = now() WHERE id = $${keys.length + 1} RETURNING *;`;
        values.push(id);

        const result = await client.query(query, values);

        return result.rows[0];

    },

    async modifyNap(nap, id) {
        let query = `UPDATE "nap" SET `;

        const values = [];

        const keys = Object.keys(nap);

        for (let i = 0; i < keys.length; i++) {
            query += `"${keys[i]}" = $${i + 1}, `;
            values.push(nap[keys[i]]);
        }

        query += `updated_at = now() WHERE id = $${keys.length + 1} RETURNING *;`;
        values.push(id);

        const result = await client.query(query, values);

        return result.rows[0];
    },

    async modifyMeal(meal, id) {
        let query = `UPDATE "meal" SET `;

        const values = [];

        const keys = Object.keys(meal);

        for (let i = 0; i < keys.length; i++) {
            query += `"${keys[i]}" = $${i + 1}, `;
            values.push(meal[keys[i]]);
        }

        query += `updated_at = now() WHERE id = $${keys.length + 1} RETURNING *;`;
        values.push(id);

        const result = await client.query(query, values);

        return result.rows[0];
    },


    async deleteRecap(id) {
        const result = await client.query('DELETE FROM "recap" WHERE id = $1', [id]);
        return result;
    },

    async deleteNap(id) {
        const result = await client.query('DELETE FROM "nap" WHERE id = $1', [id]);
        return result;
    },

    async deleteMeal(id) {
        const result = await client.query('DELETE FROM "meal" WHERE id = $1', [id]);
        return result;
    }

};

module.exports = recapDataMapper;