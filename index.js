const { ApolloServer, gql } = require("apollo-server");
const PORT = process.env.Port || 4000
const typeDefs = gql`
    type Query {
        greeting: String
        interestingUrls: [String]
    }
`;

const data = {
    greeting: "Hello world!",
    interestingUrls: ["https://kusrsrecta.pl","https://64bits.com"]
}

const server = new ApolloServer({ typeDefs, rootValue: data });

server.listen({ port: PORT }).then((result) => console.log(result.url))