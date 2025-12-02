import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Notification System API running on port ${PORT}`);
  console.log(` API Base URL: http://localhost:${PORT}/api`);
  console.log('\n Available Endpoints:');
  console.log('  POST   /api/organizations');
  console.log('  GET    /api/organizations/:orgId');
  console.log('  POST   /api/organizations/:orgId/users');
  console.log('  GET    /api/organizations/:orgId/users');
  console.log('  GET    /api/organizations/:orgId/customers');
  console.log('  POST   /api/groups');
  console.log('  POST   /api/topics');
  console.log('  GET    /api/organizations/:orgId/groups');
  console.log('  POST   /api/users/:userId/preferences/groups');
  console.log('  POST   /api/users/:userId/preferences/topics');
  console.log('  GET    /api/users/:userId/preferences');
  console.log('  POST   /api/check-permission');
});
