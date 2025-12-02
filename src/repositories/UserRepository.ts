import { injectable } from 'inversify';
import { User } from '../models/User';
import { UserRole } from '../models/types';
import { IUserRepository } from './IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
    private users: Map<string, User> = new Map();

    create(user: User): User {
        this.users.set(user.id, user);
        return user;
    }

    findById(id: string): User | undefined {
        return this.users.get(id);
    }

    findByOrganizationId(organizationId: string): User[] {
        return Array.from(this.users.values()).filter(
            user => user.organizationId === organizationId
        );
    }

    findCustomersByOrganizationId(organizationId: string): User[] {
        return Array.from(this.users.values()).filter(
            user => user.organizationId === organizationId && user.role === UserRole.CUSTOMER
        );
    }

    findAll(): User[] {
        return Array.from(this.users.values());
    }
}
