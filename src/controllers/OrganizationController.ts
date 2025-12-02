import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { IOrganizationService } from '../services/IOrganizationService';
import { TYPES } from '../config/types';

@injectable()
export class OrganizationController {
  constructor(
    @inject(TYPES.OrganizationService) private organizationService: IOrganizationService
  ) { }

  createOrganization = (req: Request, res: Response) => {
    const result = this.organizationService.createOrganization(req.body);
    res.status(201).json(result);
  };

  getOrganization = (req: Request, res: Response) => {
    const result = this.organizationService.getOrganization(req.params.orgId);
    res.json(result);
  };
}
