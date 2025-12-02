import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { IUserService } from '../services/IUserService';
import { TYPES } from '../config/types';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private userService: IUserService
  ) { }

  createUser = (req: Request, res: Response) => {
    const result = this.userService.createUser(req.params.orgId, req.body);
    res.status(201).json(result);
  };

  getUsersByOrganization = (req: Request, res: Response) => {
    const result = this.userService.getUsersByOrganization(req.params.orgId);
    res.json(result);
  };

  getCustomersByOrganization = (req: Request, res: Response) => {
    const result = this.userService.getCustomersByOrganization(req.params.orgId);
    res.json(result);
  };
}
