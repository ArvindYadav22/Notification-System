import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { IPreferenceService } from '../services/IPreferenceService';
import { TYPES } from '../config/types';

@injectable()
export class PreferenceController {
  constructor(
    @inject(TYPES.PreferenceService) private preferenceService: IPreferenceService
  ) { }

  setGroupPreference = (req: Request, res: Response) => {
    this.preferenceService.setGroupPreference(req.params.userId, req.body);
    res.status(200).json({ message: 'Group preference set successfully' });
  };

  setTopicChannelPreference = (req: Request, res: Response) => {
    this.preferenceService.setTopicChannelPreference(req.params.userId, req.body);
    res.status(200).json({ message: 'Topic channel preference set successfully' });
  };

  getUserPreferences = (req: Request, res: Response) => {
    const result = this.preferenceService.getUserPreferences(req.params.userId);
    res.json(result);
  };
}
