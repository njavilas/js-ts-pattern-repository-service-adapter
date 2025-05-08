import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IUserService } from "../service/user_service";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user_dto";

export class UserAdapter {
  private service: IUserService;

  constructor(service: IUserService) {
    this.service = service
  }

  async create(request: FastifyRequest, reply: FastifyReply) {

    const { name, email } = request.body as CreateUserDTO;

    const user = await this.service.create(name, email);

    return reply.code(201).send(user);
  }

  async getByID(request: FastifyRequest, reply: FastifyReply) {

    const { id } = request.params as { id: string };

    const user = await this.service.getByID(id);

    if (user) {
      return reply.send(user);
    }

    return reply.code(404).send({ error: "User not found" });
  }

  async updateByID(request: FastifyRequest, reply: FastifyReply) {

    const { id } = request.params as { id: string };

    const data = request.body as UpdateUserDTO;

    const user = await this.service.updateByID(id, data);

    return reply.send(user);
  }

  async deleteByID(request: FastifyRequest, reply: FastifyReply) {

    const { id } = request.params as { id: string };

    await this.service.deleteByID(id);

    return reply.code(204).send();
  }


  async findAll(_: FastifyRequest, reply: FastifyReply) {

    const users = await this.service.findAll();

    return reply.send(users);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.post("/users", this.create.bind(this));
    fastify.get("/users/:id", this.getByID.bind(this));
    fastify.put("/users/:id", this.updateByID.bind(this));
    fastify.delete("/users/:id", this.deleteByID.bind(this));
    fastify.get("/users", this.findAll.bind(this));
  }
}
