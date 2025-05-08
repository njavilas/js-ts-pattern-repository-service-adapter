import { IUser } from "../domain/user";
import { v4 as uuidv4 } from "uuid";
import { IRepository } from "../repositories/repository";

export interface IUserService {
    create(name: string, email: string): Promise<IUser>
    getByID(id: string): Promise<IUser | null>
    updateByID(id: string, data: Partial<IUser>): Promise<IUser | null>
    deleteByID(id: string): Promise<void>
    findAll(): Promise<IUser[]>
}

export class UserService implements IUserService {
    private repository: IRepository

    constructor(repository: IRepository) {
        this.repository = repository
    }

    async create(name: string, email: string): Promise<IUser> {
        const user: IUser = {
            id: uuidv4(),
            name,
            email,
        };
        return await this.repository.create(user);
    }

    async getByID(id: string): Promise<IUser | null> {
        return await this.repository.findById(id);
    }

    async updateByID(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return await this.repository.update(id, data);
    }

    async deleteByID(id: string): Promise<void> {
        return await this.repository.delete(id);
    }

    async findAll(): Promise<IUser[]> {
        return await this.repository.findAll();
    }
}
