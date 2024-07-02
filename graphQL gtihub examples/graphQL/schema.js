// schema.js
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');
const { poolPromise } = require('./db');

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve: async (parent, args) => {
                try {
                    const pool = await poolPromise;
                    const result = await pool.request()
                        .input('id', sql.Int, args.id)
                        .query('SELECT * FROM Users WHERE id = @id');
                    return result.recordset[0];
                } catch (err) {
                    throw new Error(err);
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
