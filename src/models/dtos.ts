import { UserRole, Channel } from './types';

// Organization DTOs
export interface CreateOrganizationDto {
    name: string;
}

export interface OrganizationResponseDto {
    id: string;
    name: string;
}

// User DTOs
export interface CreateUserDto {
    email: string;
    role: UserRole;
}

export interface UserResponseDto {
    id: string;
    organizationId: string;
    email: string;
    role: UserRole;
}

// Group DTOs
export interface CreateGroupDto {
    organizationId: string;
    name: string;
    adminUserId: string; // For authorization check
}

export interface GroupResponseDto {
    id: string;
    organizationId: string;
    name: string;
}

// Topic DTOs
export interface CreateTopicDto {
    groupId: string;
    name: string;
    adminUserId: string; // For authorization check
}

export interface TopicResponseDto {
    id: string;
    groupId: string;
    name: string;
}

// Preference DTOs
export interface SetGroupPreferenceDto {
    groupId: string;
    enabled: boolean;
}

export interface SetTopicChannelPreferenceDto {
    topicId: string;
    channel: Channel;
    enabled: boolean;
}

// Decision DTOs
export interface CheckPermissionDto {
    userId: string;
    topicId: string;
    channel: Channel;
}

export interface CheckPermissionResponseDto {
    allowed: boolean;
}

// User Preferences Response (Grouped Structure)
export interface ChannelPreferences {
    [channel: string]: boolean;
}

export interface TopicPreferenceDto {
    topicId: string;
    topicName: string;
    channels: ChannelPreferences;
}

export interface GroupPreferenceDto {
    groupId: string;
    groupName: string;
    enabled: boolean;
    topics: TopicPreferenceDto[];
}

export interface UserPreferencesResponseDto {
    userId: string;
    preferences: GroupPreferenceDto[];
}

// Groups with Topics Response
export interface TopicInGroupDto {
    id: string;
    name: string;
}

export interface GroupWithTopicsDto {
    id: string;
    name: string;
    topics: TopicInGroupDto[];
}

export interface OrganizationGroupsResponseDto {
    organizationId: string;
    groups: GroupWithTopicsDto[];
}
