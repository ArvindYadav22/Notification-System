import {
    CreateGroupDto,
    CreateTopicDto,
    GroupResponseDto,
    TopicResponseDto,
    OrganizationGroupsResponseDto
} from '../models/dtos';

export interface INotificationService {
    createGroup(dto: CreateGroupDto): GroupResponseDto;
    createTopic(dto: CreateTopicDto): TopicResponseDto;
    getGroupsByOrganization(organizationId: string): OrganizationGroupsResponseDto;
}
