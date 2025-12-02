import { Topic } from '../models/Topic';

export interface ITopicRepository {
    create(topic: Topic): Topic;
    findById(id: string): Topic | undefined;
    findByGroupId(groupId: string): Topic[];
    findAll(): Topic[];
}
