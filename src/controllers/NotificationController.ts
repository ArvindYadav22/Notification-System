import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { INotificationService } from '../services/INotificationService';
import { TYPES } from '../config/types';

@injectable()
export class NotificationController {
  constructor(
    @inject(TYPES.NotificationService) private notificationService: INotificationService
  ) { }

  createGroup = (req: Request, res: Response) => {
    const result = this.notificationService.createGroup(req.body);
    res.status(201).json(result);
  };

  createTopic = (req: Request, res: Response) => {
    const result = this.notificationService.createTopic(req.body);
    res.status(201).json(result);
  };

  getGroupsByOrganization = (req: Request, res: Response) => {
    const result = this.notificationService.getGroupsByOrganization(req.params.orgId);
    res.json(result);
  };
}
