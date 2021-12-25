/*const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require('faunadb');

const q = faunadb.query;
const shortid = require('shortid')

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Lolly {
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    pathLolly: String!
  }
  type Mutation {
    createLolly (recipientName: String!, message: String!,senderName: String!, flavourTop: String!,flavourMiddle: String!,flavourBottom: String!) : Lolly
  }
`

/* Test Data already provided in lambda server function

const authors = [
  { id: 1, name: 'Terry Pratchett', married: false },
  { id: 2, name: 'Stephen King', married: true },
  { id: 3, name: 'JK Rowling', married: false },
]

const resolvers = {
  Query: {
    hello: () => {
      return 'hello me'
      
    },
   
 
  },
  Mutation: {
    createLolly: async(root, args) => {
     var client =  new faunadb.Client({secret: "fnAEbCXikmACTLP9mDWuxiU1yt-k_8_eHCr1wOxB"});
      const id = shortid.generate();
      args.pathLolly =id

      var result = await client.query(
        q.Create(q.Collection('lollyindex',{
          data: args
        }))
      )


      console.log("result ",  result.data)
      
      return result.data

     
      
    },
    
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler } */


const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require("faunadb");
const q = faunadb.query;
const shortid = require("shortid");

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Lolly {
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    pathLolly: String!
  }
  type Mutation {
    createLolly (recipientName: String!, message: String!,senderName: String!, flavourTop: String!,flavourMiddle: String!,flavourBottom: String!) : Lolly
  }
`


const resolvers = {
  Query: {
    hello: () => {
      return 'Hello, Lolly!'
    },
  },
  Mutation : {
    createLolly: async (_, args) => {

        console.log("args = ",args);
      
    const client = new faunadb.Client({secret: "fnAEbCXikmACTLP9mDWuxiU1yt-k_8_eHCr1wOxB"});
      const id = shortid.generate();
      args.pathLolly = id

      const result = await client.query(
        q.Create(q.Collection("virtuallolly"), {
          data: args
        })
      );
        
      console.log('result', result);
      console.log('result', result.data);
      return result.data
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
