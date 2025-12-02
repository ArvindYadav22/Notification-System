export const TYPES = {
  // Repositories
  OrganizationRepository: Symbol.for('OrganizationRepository'),
  UserRepository: Symbol.for('UserRepository'),
  GroupRepository: Symbol.for('GroupRepository'),
  TopicRepository: Symbol.for('TopicRepository'),
  PreferenceRepository: Symbol.for('PreferenceRepository'),

  // Services
  OrganizationService: Symbol.for('OrganizationService'),
  UserService: Symbol.for('UserService'),
  NotificationService: Symbol.for('NotificationService'),
  PreferenceService: Symbol.for('PreferenceService'),
  DecisionService: Symbol.for('DecisionService'),

  // Controllers
  OrganizationController: Symbol.for('OrganizationController'),
  UserController: Symbol.for('UserController'),
  NotificationController: Symbol.for('NotificationController'),
  PreferenceController: Symbol.for('PreferenceController'),
  DecisionController: Symbol.for('DecisionController')
};
