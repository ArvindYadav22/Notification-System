import { Group } from '../models/Group';

export interface IGroupRepository {
    create(group: Group): Group;
    findById(id: string): Group | undefined;
    findByOrganizationId(organizationId: string): Group[];
    findAll(): Group[];
}
