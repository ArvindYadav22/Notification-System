import { User } from '../models/User';

export interface IUserRepository {
    create(user: User): User;
    findById(id: string): User | undefined;
    findByOrganizationId(organizationId: string): User[];
    findCustomersByOrganizationId(organizationId: string): User[];
    findAll(): User[];
}
