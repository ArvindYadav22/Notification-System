import { Channel } from './types';

export class UserTopicChannelPreference {
    constructor(
        public userId: string,
        public topicId: string,
        public channel: Channel,
        public enabled: boolean
    ) { }
}
