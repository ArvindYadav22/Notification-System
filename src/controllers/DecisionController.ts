import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { IDecisionService } from '../services/IDecisionService';
import { TYPES } from '../config/types';

@injectable()
export class DecisionController {
  constructor(
    @inject(TYPES.DecisionService) private decisionService: IDecisionService
  ) { }

  checkPermission = (req: Request, res: Response) => {
    const result = this.decisionService.checkPermission(req.body);
    res.json(result);
  };
}
