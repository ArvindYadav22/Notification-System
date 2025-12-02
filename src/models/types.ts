export enum UserRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
}

export enum Channel {
    EMAIL = 'email',
    SMS = 'sms',
    PUSH = 'push',
    IN_APP = 'in_app',
    CHAT = 'chat',
    WHATSAPP = 'whatsapp'
}

export const VALID_CHANNELS = Object.values(Channel);
