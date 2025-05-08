import Fastify from "fastify";
import dynamoose from "dynamoose";

import { UserAdapter } from "./adapters/user_adapter";
import { UserService } from "./service/user_service";
import { UserRepositoryImpl } from "./repositories/user_repository";

dynamoose.aws.ddb.local();

const fastify = Fastify();

const repository = new UserRepositoryImpl();
const service = new UserService(repository);
const adapter = new UserAdapter(service);

adapter.registerRoutes(fastify);

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server listening at ${address}`);
});
