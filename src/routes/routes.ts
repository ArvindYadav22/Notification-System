import { Router } from 'express';
import { container } from '../config/container';
import { TYPES } from '../config/types';
import { OrganizationController } from '../controllers/OrganizationController';
import { UserController } from '../controllers/UserController';
import { NotificationController } from '../controllers/NotificationController';
import { PreferenceController } from '../controllers/PreferenceController';
import { DecisionController } from '../controllers/DecisionController';

const router = Router();

// Get controller instances from container
const organizationController = container.get<OrganizationController>(TYPES.OrganizationController);
const userController = container.get<UserController>(TYPES.UserController);
const notificationController = container.get<NotificationController>(TYPES.NotificationController);
const preferenceController = container.get<PreferenceController>(TYPES.PreferenceController);
const decisionController = container.get<DecisionController>(TYPES.DecisionController);

// Organization routes
router.post('/organizations', (req, res, next) => {
  try {
    organizationController.createOrganization(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/organizations/:orgId', (req, res, next) => {
  try {
    organizationController.getOrganization(req, res);
  } catch (error) {
    next(error);
  }
});

// User routes
router.post('/organizations/:orgId/users', (req, res, next) => {
  try {
    userController.createUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/organizations/:orgId/users', (req, res, next) => {
  try {
    userController.getUsersByOrganization(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/organizations/:orgId/customers', (req, res, next) => {
  try {
    userController.getCustomersByOrganization(req, res);
  } catch (error) {
    next(error);
  }
});

// Notification routes (Groups & Topics)
router.post('/groups', (req, res, next) => {
  try {
    notificationController.createGroup(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/topics', (req, res, next) => {
  try {
    notificationController.createTopic(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/organizations/:orgId/groups', (req, res, next) => {
  try {
    notificationController.getGroupsByOrganization(req, res);
  } catch (error) {
    next(error);
  }
});

// Preference routes
router.post('/users/:userId/preferences/groups', (req, res, next) => {
  try {
    preferenceController.setGroupPreference(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/users/:userId/preferences/topics', (req, res, next) => {
  try {
    preferenceController.setTopicChannelPreference(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/users/:userId/preferences', (req, res, next) => {
  try {
    preferenceController.getUserPreferences(req, res);
  } catch (error) {
    next(error);
  }
});

// Decision route
router.post('/check-permission', (req, res, next) => {
  try {
    decisionController.checkPermission(req, res);
  } catch (error) {
    next(error);
  }
});

export { router };
