import { Organization } from '../models/Organization';
import { CreateOrganizationDto, OrganizationResponseDto } from '../models/dtos';

export interface IOrganizationService {
    createOrganization(dto: CreateOrganizationDto): OrganizationResponseDto;
    getOrganization(id: string): OrganizationResponseDto;
}
