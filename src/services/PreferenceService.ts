import { injectable, inject } from 'inversify';
import { UserGroupPreference } from '../models/UserGroupPreference';
import { UserTopicChannelPreference } from '../models/UserTopicChannelPreference';
import { Channel, VALID_CHANNELS } from '../models/types';
import {
    SetGroupPreferenceDto,
    SetTopicChannelPreferenceDto,
    UserPreferencesResponseDto,
    GroupPreferenceDto,
    TopicPreferenceDto,
    ChannelPreferences
} from '../models/dtos';
import { IPreferenceRepository } from '../repositories/IPreferenceRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { IGroupRepository } from '../repositories/IGroupRepository';
import { ITopicRepository } from '../repositories/ITopicRepository';
import { IPreferenceService } from './IPreferenceService';
import { TYPES } from '../config/types';
import { AppError } from '../utils/AppError';

@injectable()
export class PreferenceService implements IPreferenceService {
    constructor(
        @inject(TYPES.PreferenceRepository) private preferenceRepository: IPreferenceRepository,
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.GroupRepository) private groupRepository: IGroupRepository,
        @inject(TYPES.TopicRepository) private topicRepository: ITopicRepository
    ) { }

    setGroupPreference(userId: string, dto: SetGroupPreferenceDto): void {
        // Validate user exists
        const user = this.userRepository.findById(userId);
        if (!user) {
            throw new AppError(`User with id ${userId} not found`, 404);
        }

        // Validate group exists
        const group = this.groupRepository.findById(dto.groupId);
        if (!group) {
            throw new AppError(`Group with id ${dto.groupId} not found`, 404);
        }

        // Validate user belongs to same organization as group
        if (user.organizationId !== group.organizationId) {
            throw new AppError('User does not belong to the same organization as the group', 403);
        }

        const preference = new UserGroupPreference(userId, dto.groupId, dto.enabled);
        this.preferenceRepository.setGroupPreference(preference);
    }

    setTopicChannelPreference(userId: string, dto: SetTopicChannelPreferenceDto): void {
        // Validate user exists
        const user = this.userRepository.findById(userId);
        if (!user) {
            throw new AppError(`User with id ${userId} not found`, 404);
        }

        // Validate topic exists
        const topic = this.topicRepository.findById(dto.topicId);
        if (!topic) {
            throw new AppError(`Topic with id ${dto.topicId} not found`, 404);
        }

        // Validate channel is valid
        if (!VALID_CHANNELS.includes(dto.channel)) {
            throw new AppError(`Invalid channel: ${dto.channel}`, 400);
        }

        // Get group for topic and validate user belongs to same organization
        const group = this.groupRepository.findById(topic.groupId);
        if (!group) {
            throw new AppError(`Group with id ${topic.groupId} not found`, 404);
        }

        if (user.organizationId !== group.organizationId) {
            throw new AppError('User does not belong to the same organization as the topic', 403);
        }

        const preference = new UserTopicChannelPreference(userId, dto.topicId, dto.channel, dto.enabled);
        this.preferenceRepository.setTopicChannelPreference(preference);
    }

    getUserPreferences(userId: string): UserPreferencesResponseDto {
        // Validate user exists
        const user = this.userRepository.findById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }

        // Get all groups for user's organization
        const groups = this.groupRepository.findByOrganizationId(user.organizationId);

        const groupPreferences: GroupPreferenceDto[] = groups.map(group => {
            // Get group preference (default to enabled if not set)
            const groupPref = this.preferenceRepository.getGroupPreference(userId, group.id);
            const groupEnabled = groupPref ? groupPref.enabled : true;

            // Get all topics for this group
            const topics = this.topicRepository.findByGroupId(group.id);

            const topicPreferences: TopicPreferenceDto[] = topics.map(topic => {
                // Get all channel preferences for this topic
                const channelPrefs = this.preferenceRepository.getTopicChannelPreferencesByTopic(userId, topic.id);

                // Build channel preferences object
                const channels: ChannelPreferences = {};
                VALID_CHANNELS.forEach(channel => {
                    const pref = channelPrefs.find(p => p.channel === channel);
                    channels[channel] = pref ? pref.enabled : false; // Default to false if not set
                });

                return {
                    topicId: topic.id,
                    topicName: topic.name,
                    channels
                };
            });

            return {
                groupId: group.id,
                groupName: group.name,
                enabled: groupEnabled,
                topics: topicPreferences
            };
        });

        return {
            userId,
            preferences: groupPreferences
        };
    }
}
