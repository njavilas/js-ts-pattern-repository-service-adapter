import { IUser } from "../domain/user"

export interface IUserRepository {
    create(user: IUser): Promise<IUser>
    findById(id: string): Promise<IUser | null>
    update(id: string, data: Partial<IUser>): Promise<IUser | null>
    delete(id: string): Promise<void>
    findAll(): Promise<IUser[]>
}