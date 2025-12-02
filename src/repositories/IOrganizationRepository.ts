import { Organization } from '../models/Organization';

export interface IOrganizationRepository {
    create(organization: Organization): Organization;
    findById(id: string): Organization | undefined;
    findAll(): Organization[];
}
