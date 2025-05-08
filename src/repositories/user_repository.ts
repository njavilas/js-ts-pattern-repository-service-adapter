import { client } from "../models/user_model";
import { IUser } from "../domain/user";
import { IUserRepository } from "./repository";

export class UserRepositoryImpl implements IUserRepository {
    async create(user: IUser): Promise<IUser> {
        return await client.create(user);
    }

    async findById(id: string): Promise<IUser | null> {
        return await client.get(id);
    }

    async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return await client.update({ id }, data);
    }

    async delete(id: string): Promise<void> {
        await client.delete(id);
    }

    async findAll(): Promise<IUser[]> {
        return await client.scan().exec();
    }
}
