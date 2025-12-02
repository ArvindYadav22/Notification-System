import { UserGroupPreference } from '../models/UserGroupPreference';
import { UserTopicChannelPreference } from '../models/UserTopicChannelPreference';
import { Channel } from '../models/types';

export interface IPreferenceRepository {
    // Group Preferences
    setGroupPreference(preference: UserGroupPreference): UserGroupPreference;
    getGroupPreference(userId: string, groupId: string): UserGroupPreference | undefined;
    getUserGroupPreferences(userId: string): UserGroupPreference[];

    // Topic Channel Preferences
    setTopicChannelPreference(preference: UserTopicChannelPreference): UserTopicChannelPreference;
    getTopicChannelPreference(userId: string, topicId: string, channel: Channel): UserTopicChannelPreference | undefined;
    getUserTopicChannelPreferences(userId: string): UserTopicChannelPreference[];
    getTopicChannelPreferencesByTopic(userId: string, topicId: string): UserTopicChannelPreference[];
}
