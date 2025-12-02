import { injectable } from 'inversify';
import { Organization } from '../models/Organization';
import { IOrganizationRepository } from './IOrganizationRepository';

@injectable()
export class OrganizationRepository implements IOrganizationRepository {
    private organizations: Map<string, Organization> = new Map();

    create(organization: Organization): Organization {
        this.organizations.set(organization.id, organization);
        return organization;
    }

    findById(id: string): Organization | undefined {
        return this.organizations.get(id);
    }

    findAll(): Organization[] {
        return Array.from(this.organizations.values());
    }
}
