import { CreateUserDto, UserResponseDto } from '../models/dtos';

export interface IUserService {
    createUser(organizationId: string, dto: CreateUserDto): UserResponseDto;
    getUser(id: string): UserResponseDto;
    getUsersByOrganization(organizationId: string): UserResponseDto[];
    getCustomersByOrganization(organizationId: string): UserResponseDto[];
}
