import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../models/Group';
import { Topic } from '../models/Topic';
import { UserRole } from '../models/types';
import {
    CreateGroupDto,
    CreateTopicDto,
    GroupResponseDto,
    TopicResponseDto,
    OrganizationGroupsResponseDto,
    GroupWithTopicsDto
} from '../models/dtos';
import { IGroupRepository } from '../repositories/IGroupRepository';
import { ITopicRepository } from '../repositories/ITopicRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { IOrganizationRepository } from '../repositories/IOrganizationRepository';
import { INotificationService } from './INotificationService';
import { TYPES } from '../config/types';
import { AppError } from '../utils/AppError';

@injectable()
export class NotificationService implements INotificationService {
    constructor(
        @inject(TYPES.GroupRepository) private groupRepository: IGroupRepository,
        @inject(TYPES.TopicRepository) private topicRepository: ITopicRepository,
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.OrganizationRepository) private organizationRepository: IOrganizationRepository
    ) { }

    createGroup(dto: CreateGroupDto): GroupResponseDto {
        // Validate admin user
        const user = this.userRepository.findById(dto.adminUserId);
        if (!user) {
            throw new AppError(`User with id ${dto.adminUserId} not found`, 404);
        }

        if (user.role !== UserRole.ADMIN) {
            throw new AppError('Only admin users can create groups', 403);
        }

        // Validate organization exists
        const organization = this.organizationRepository.findById(dto.organizationId);
        if (!organization) {
            throw new AppError(`Organization with id ${dto.organizationId} not found`, 404);
        }

        // Validate user belongs to organization
        if (user.organizationId !== dto.organizationId) {
            throw new AppError('Admin user does not belong to this organization', 403);
        }

        const group = new Group(uuidv4(), dto.organizationId, dto.name);
        const created = this.groupRepository.create(group);

        return {
            id: created.id,
            organizationId: created.organizationId,
            name: created.name
        };
    }

    createTopic(dto: CreateTopicDto): TopicResponseDto {
        // Validate admin user
        const user = this.userRepository.findById(dto.adminUserId);
        if (!user) {
            throw new Error(`User with id ${dto.adminUserId} not found`);
        }

        if (user.role !== UserRole.ADMIN) {
            throw new AppError('Only admin users can create topics', 403);
        }

        // Validate group exists
        const group = this.groupRepository.findById(dto.groupId);
        if (!group) {
            throw new AppError(`Group with id ${dto.groupId} not found`, 404);
        }

        // Validate user belongs to same organization as group
        if (user.organizationId !== group.organizationId) {
            throw new AppError('Admin user does not belong to the same organization as the group', 403);
        }

        const topic = new Topic(uuidv4(), dto.groupId, dto.name);
        const created = this.topicRepository.create(topic);

        return {
            id: created.id,
            groupId: created.groupId,
            name: created.name
        };
    }

    getGroupsByOrganization(organizationId: string): OrganizationGroupsResponseDto {
        // Validate organization exists
        const organization = this.organizationRepository.findById(organizationId);
        if (!organization) {
            throw new AppError(`Organization with id ${organizationId} not found`, 404);
        }

        const groups = this.groupRepository.findByOrganizationId(organizationId);

        const groupsWithTopics: GroupWithTopicsDto[] = groups.map(group => {
            const topics = this.topicRepository.findByGroupId(group.id);

            return {
                id: group.id,
                name: group.name,
                topics: topics.map(topic => ({
                    id: topic.id,
                    name: topic.name
                }))
            };
        });

        return {
            organizationId,
            groups: groupsWithTopics
        };
    }
}
