import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { Organization } from '../models/Organization';
import { CreateOrganizationDto, OrganizationResponseDto } from '../models/dtos';
import { IOrganizationRepository } from '../repositories/IOrganizationRepository';
import { IOrganizationService } from './IOrganizationService';
import { TYPES } from '../config/types';

@injectable()
export class OrganizationService implements IOrganizationService {
    constructor(
        @inject(TYPES.OrganizationRepository) private organizationRepository: IOrganizationRepository
    ) { }

    createOrganization(dto: CreateOrganizationDto): OrganizationResponseDto {
        const organization = new Organization(uuidv4(), dto.name);
        const created = this.organizationRepository.create(organization);

        return {
            id: created.id,
            name: created.name
        };
    }

    getOrganization(id: string): OrganizationResponseDto {
        const organization = this.organizationRepository.findById(id);

        if (!organization) {
            throw new Error(`Organization with id ${id} not found`);
        }

        return {
            id: organization.id,
            name: organization.name
        };
    }
}
