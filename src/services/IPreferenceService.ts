import {
    SetGroupPreferenceDto,
    SetTopicChannelPreferenceDto,
    UserPreferencesResponseDto
} from '../models/dtos';

export interface IPreferenceService {
    setGroupPreference(userId: string, dto: SetGroupPreferenceDto): void;
    setTopicChannelPreference(userId: string, dto: SetTopicChannelPreferenceDto): void;
    getUserPreferences(userId: string): UserPreferencesResponseDto;
}
