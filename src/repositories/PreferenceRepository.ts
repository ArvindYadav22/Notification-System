import { injectable } from 'inversify';
import { UserGroupPreference } from '../models/UserGroupPreference';
import { UserTopicChannelPreference } from '../models/UserTopicChannelPreference';
import { Channel } from '../models/types';
import { IPreferenceRepository } from './IPreferenceRepository';

@injectable()
export class PreferenceRepository implements IPreferenceRepository {
    private groupPreferences: Map<string, UserGroupPreference> = new Map();
    private topicChannelPreferences: Map<string, UserTopicChannelPreference> = new Map();

    // Helper to create composite keys
    private getGroupPreferenceKey(userId: string, groupId: string): string {
        return `${userId}:${groupId}`;
    }

    private getTopicChannelPreferenceKey(userId: string, topicId: string, channel: Channel): string {
        return `${userId}:${topicId}:${channel}`;
    }

    // Group Preferences
    setGroupPreference(preference: UserGroupPreference): UserGroupPreference {
        const key = this.getGroupPreferenceKey(preference.userId, preference.groupId);
        this.groupPreferences.set(key, preference);
        return preference;
    }

    getGroupPreference(userId: string, groupId: string): UserGroupPreference | undefined {
        const key = this.getGroupPreferenceKey(userId, groupId);
        return this.groupPreferences.get(key);
    }

    getUserGroupPreferences(userId: string): UserGroupPreference[] {
        return Array.from(this.groupPreferences.values()).filter(
            pref => pref.userId === userId
        );
    }

    // Topic Channel Preferences
    setTopicChannelPreference(preference: UserTopicChannelPreference): UserTopicChannelPreference {
        const key = this.getTopicChannelPreferenceKey(preference.userId, preference.topicId, preference.channel);
        this.topicChannelPreferences.set(key, preference);
        return preference;
    }

    getTopicChannelPreference(userId: string, topicId: string, channel: Channel): UserTopicChannelPreference | undefined {
        const key = this.getTopicChannelPreferenceKey(userId, topicId, channel);
        return this.topicChannelPreferences.get(key);
    }

    getUserTopicChannelPreferences(userId: string): UserTopicChannelPreference[] {
        return Array.from(this.topicChannelPreferences.values()).filter(
            pref => pref.userId === userId
        );
    }

    getTopicChannelPreferencesByTopic(userId: string, topicId: string): UserTopicChannelPreference[] {
        return Array.from(this.topicChannelPreferences.values()).filter(
            pref => pref.userId === userId && pref.topicId === topicId
        );
    }
}
