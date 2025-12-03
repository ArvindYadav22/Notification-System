import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User';
import { CreateUserDto, UserResponseDto } from '../models/dtos';
import { IUserRepository } from '../repositories/IUserRepository';
import { IOrganizationRepository } from '../repositories/IOrganizationRepository';
import { IUserService } from './IUserService';
import { TYPES } from '../config/types';
import { AppError } from '../utils/AppError';

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.OrganizationRepository) private organizationRepository: IOrganizationRepository
    ) { }

    createUser(organizationId: string, dto: CreateUserDto): UserResponseDto {
        // Validate organization exists
        const organization = this.organizationRepository.findById(organizationId);
        if (!organization) {
            throw new AppError(`Organization with id ${organizationId} not found`, 404);
        }

        const user = new User(uuidv4(), organizationId, dto.email, dto.role);
        const created = this.userRepository.create(user);

        return {
            id: created.id,
            organizationId: created.organizationId,
            email: created.email,
            role: created.role
        };
    }

    getUser(id: string): UserResponseDto {
        const user = this.userRepository.findById(id);

        if (!user) {
            throw new AppError(`User with id ${id} not found`, 404);
        }

        return {
            id: user.id,
            organizationId: user.organizationId,
            email: user.email,
            role: user.role
        };
    }

    getUsersByOrganization(organizationId: string): UserResponseDto[] {
        const users = this.userRepository.findByOrganizationId(organizationId);

        return users.map(user => ({
            id: user.id,
            organizationId: user.organizationId,
            email: user.email,
            role: user.role
        }));
    }

    getCustomersByOrganization(organizationId: string): UserResponseDto[] {
        const customers = this.userRepository.findCustomersByOrganizationId(organizationId);

        return customers.map(user => ({
            id: user.id,
            organizationId: user.organizationId,
            email: user.email,
            role: user.role
        }));
    }
}
