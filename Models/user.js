// create a user model class based on the database schema
const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class User {
  // create a new user record
  async create(data) {
    try {
      const query = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
      const result = await db.query(query);
      
      if (result.rows?.length) {
        return result.rows[0];
      } 
        return null;
      
      } catch(err) {
        throw new Error(err);
      }
    } 

  
  
    async update(data) {
      try {

        const { id, ...params } = data;

        const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
        const statement = pgp.helpers.update(params, null, 'users') + condition;

        const result = await db.query(statement);

        if (result.rows?.length) {
          return result.rows[0];
        }
        return null;

      } catch(err) {
        throw new Error(err);
      }
  };
  
  async findOneByEmail(email) {
    try {
      const query = `
        SELECT * FROM users WHERE email = $1
      `;
      const result = await db.query(query, [email]);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
        throw new Error(err);
    }
  };

  async findOneById(id) {
    try {
      const query = `
        SELECT * FROM users WHERE id = $1
      `;
      const result = await db.query(query, [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }
};
