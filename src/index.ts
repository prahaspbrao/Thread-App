import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

async function init() {
  const app = express();
  const port = process.env.PORT || 8000;

  app.use(express.json());

  // create gql server
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
            say(name : String) : String
        }
    `,
    resolvers: {
        Query : {
            hello: () => "Hey there , Iam a graphQl server",
            say: (_ ,{name } : {name : String} )=> `Hey ${name} how are you ?`
        }
    },
  });

  // start the gql server
  await gqlServer.start();

  app.get("/", (req, res) =>
    res.json({
      message: "Server is up and running!!",
    }),
  );

  app.use("/graphql" , expressMiddleware(gqlServer));

  app.listen(port, () => {
    console.log(`Server started at port : ${port}`);
  });
}

init()