import { injectable, inject } from 'inversify';
import { CheckPermissionDto, CheckPermissionResponseDto } from '../models/dtos';
import { VALID_CHANNELS } from '../models/types';
import { IUserRepository } from '../repositories/IUserRepository';
import { ITopicRepository } from '../repositories/ITopicRepository';
import { IGroupRepository } from '../repositories/IGroupRepository';
import { IPreferenceRepository } from '../repositories/IPreferenceRepository';
import { IDecisionService } from './IDecisionService';
import { TYPES } from '../config/types';
import { AppError } from '../utils/AppError';

@injectable()
export class DecisionService implements IDecisionService {
    constructor(
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.TopicRepository) private topicRepository: ITopicRepository,
        @inject(TYPES.GroupRepository) private groupRepository: IGroupRepository,
        @inject(TYPES.PreferenceRepository) private preferenceRepository: IPreferenceRepository
    ) { }

    checkPermission(dto: CheckPermissionDto): CheckPermissionResponseDto {
        // Step 1: Validate user exists
        const user = this.userRepository.findById(dto.userId);
        if (!user) {
            throw new AppError(`User with id ${dto.userId} not found`, 404);
        }

        // Step 2: Validate topic exists
        const topic = this.topicRepository.findById(dto.topicId);
        if (!topic) {
            throw new AppError(`Topic with id ${dto.topicId} not found`, 404);
        }

        // Step 3: Validate channel is valid
        if (!VALID_CHANNELS.includes(dto.channel)) {
            throw new AppError(`Invalid channel: ${dto.channel}`, 400);
        }

        // Step 4: Get the group for this topic
        const group = this.groupRepository.findById(topic.groupId);
        if (!group) {
            throw new AppError(`Group with id ${topic.groupId} not found`, 404);
        }

        // Step 5: Check if user belongs to same organization
        if (user.organizationId !== group.organizationId) {
            throw new AppError('User does not belong to the same organization as the topic', 403);
        }

        // Step 6: Check group-level preference
        const groupPreference = this.preferenceRepository.getGroupPreference(dto.userId, group.id);

        // If group is explicitly disabled, block notification
        if (groupPreference && groupPreference.enabled === false) {
            return { allowed: false };
        }

        // Step 7: If group is enabled (or no preference = default enabled), check topic-channel preference
        const topicChannelPreference = this.preferenceRepository.getTopicChannelPreference(
            dto.userId,
            dto.topicId,
            dto.channel
        );

        // If channel is explicitly enabled, allow notification
        if (topicChannelPreference && topicChannelPreference.enabled === true) {
            return { allowed: true };
        }

        // Default: block if no preference or explicitly disabled
        return { allowed: false };
    }
}
