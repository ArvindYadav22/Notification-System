import { injectable } from 'inversify';
import { Group } from '../models/Group';
import { IGroupRepository } from './IGroupRepository';

@injectable()
export class GroupRepository implements IGroupRepository {
    private groups: Map<string, Group> = new Map();

    create(group: Group): Group {
        this.groups.set(group.id, group);
        return group;
    }

    findById(id: string): Group | undefined {
        return this.groups.get(id);
    }

    findByOrganizationId(organizationId: string): Group[] {
        return Array.from(this.groups.values()).filter(
            group => group.organizationId === organizationId
        );
    }

    findAll(): Group[] {
        return Array.from(this.groups.values());
    }
}
