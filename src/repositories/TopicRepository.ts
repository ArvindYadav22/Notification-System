import { injectable } from 'inversify';
import { Topic } from '../models/Topic';
import { ITopicRepository } from './ITopicRepository';

@injectable()
export class TopicRepository implements ITopicRepository {
    private topics: Map<string, Topic> = new Map();

    create(topic: Topic): Topic {
        this.topics.set(topic.id, topic);
        return topic;
    }

    findById(id: string): Topic | undefined {
        return this.topics.get(id);
    }

    findByGroupId(groupId: string): Topic[] {
        return Array.from(this.topics.values()).filter(
            topic => topic.groupId === groupId
        );
    }

    findAll(): Topic[] {
        return Array.from(this.topics.values());
    }
}
