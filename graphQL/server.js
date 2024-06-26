// server.js
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema');

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
