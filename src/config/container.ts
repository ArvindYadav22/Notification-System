import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

// Repositories
import { IOrganizationRepository } from '../repositories/IOrganizationRepository';
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import { IGroupRepository } from '../repositories/IGroupRepository';
import { GroupRepository } from '../repositories/GroupRepository';
import { ITopicRepository } from '../repositories/ITopicRepository';
import { TopicRepository } from '../repositories/TopicRepository';
import { IPreferenceRepository } from '../repositories/IPreferenceRepository';
import { PreferenceRepository } from '../repositories/PreferenceRepository';

// Services
import { IOrganizationService } from '../services/IOrganizationService';
import { OrganizationService } from '../services/OrganizationService';
import { IUserService } from '../services/IUserService';
import { UserService } from '../services/UserService';
import { INotificationService } from '../services/INotificationService';
import { NotificationService } from '../services/NotificationService';
import { IPreferenceService } from '../services/IPreferenceService';
import { PreferenceService } from '../services/PreferenceService';
import { IDecisionService } from '../services/IDecisionService';
import { DecisionService } from '../services/DecisionService';

// Controllers
import { OrganizationController } from '../controllers/OrganizationController';
import { UserController } from '../controllers/UserController';
import { NotificationController } from '../controllers/NotificationController';
import { PreferenceController } from '../controllers/PreferenceController';
import { DecisionController } from '../controllers/DecisionController';

const container = new Container();

// Bind Repositories
container.bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(OrganizationRepository).inSingletonScope();
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<IGroupRepository>(TYPES.GroupRepository).to(GroupRepository).inSingletonScope();
container.bind<ITopicRepository>(TYPES.TopicRepository).to(TopicRepository).inSingletonScope();
container.bind<IPreferenceRepository>(TYPES.PreferenceRepository).to(PreferenceRepository).inSingletonScope();

// Bind Services
container.bind<IOrganizationService>(TYPES.OrganizationService).to(OrganizationService);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<INotificationService>(TYPES.NotificationService).to(NotificationService);
container.bind<IPreferenceService>(TYPES.PreferenceService).to(PreferenceService);
container.bind<IDecisionService>(TYPES.DecisionService).to(DecisionService);

// Bind Controllers
container.bind<OrganizationController>(TYPES.OrganizationController).to(OrganizationController);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<NotificationController>(TYPES.NotificationController).to(NotificationController);
container.bind<PreferenceController>(TYPES.PreferenceController).to(PreferenceController);
container.bind<DecisionController>(TYPES.DecisionController).to(DecisionController);

export { container };
