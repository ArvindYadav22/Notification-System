# API Examples & Verification Scenarios

Use these commands to verify the system functionality.

## 1. Setup Data

### Create Organization
```bash
curl -X POST http://localhost:3000/api/organizations \
  -H "Content-Type: application/json" \
  -d '{"name": "TechCorp"}'
```
*Save the returned `id` as `ORG_ID`*

### Create Admin User
```bash
curl -X POST http://localhost:3000/api/organizations/ORG_ID/users \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@techcorp.com", "role": "ADMIN"}'
```
*Save the returned `id` as `ADMIN_ID`*

### Create Customer User
```bash
curl -X POST http://localhost:3000/api/organizations/ORG_ID/users \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@techcorp.com", "role": "CUSTOMER"}'
```
*Save the returned `id` as `USER_ID`*

### Create Groups (by Admin)
```bash
# Group 1: Account Security
curl -X POST http://localhost:3000/api/groups \
  -H "Content-Type: application/json" \
  -d '{"organizationId": "ORG_ID", "name": "Account Security", "adminUserId": "ADMIN_ID"}'
```
*Save `id` as `GROUP_SEC_ID`*

```bash
# Group 2: Marketing
curl -X POST http://localhost:3000/api/groups \
  -H "Content-Type: application/json" \
  -d '{"organizationId": "ORG_ID", "name": "Marketing", "adminUserId": "ADMIN_ID"}'
```
*Save `id` as `GROUP_MKT_ID`*

### Create Topics (by Admin)
```bash
# Topic 1: Login Alerts (under Account Security)
curl -X POST http://localhost:3000/api/topics \
  -H "Content-Type: application/json" \
  -d '{"groupId": "GROUP_SEC_ID", "name": "login_alerts", "adminUserId": "ADMIN_ID"}'
```
*Save `id` as `TOPIC_LOGIN_ID`*

```bash
# Topic 2: Offers (under Marketing)
curl -X POST http://localhost:3000/api/topics \
  -H "Content-Type: application/json" \
  -d '{"groupId": "GROUP_MKT_ID", "name": "offers", "adminUserId": "ADMIN_ID"}'
```
*Save `id` as `TOPIC_OFFERS_ID`*

---

## 2. Set Preferences

### Scenario A: User enables SMS for Login Alerts (Group enabled by default)
```bash
curl -X POST http://localhost:3000/api/users/USER_ID/preferences/topics \
  -H "Content-Type: application/json" \
  -d '{"topicId": "TOPIC_LOGIN_ID", "channel": "sms", "enabled": true}'
```

### Scenario B: User disables Marketing Group entirely
```bash
curl -X POST http://localhost:3000/api/users/USER_ID/preferences/groups \
  -H "Content-Type: application/json" \
  -d '{"groupId": "GROUP_MKT_ID", "enabled": false}'
```

### Scenario C: User enables Email for Offers (but Group is disabled!)
```bash
curl -X POST http://localhost:3000/api/users/USER_ID/preferences/topics \
  -H "Content-Type: application/json" \
  -d '{"topicId": "TOPIC_OFFERS_ID", "channel": "email", "enabled": true}'
```

---

## 3. Verify Decision Logic

### Check 1: Login Alerts via SMS
**Expected: ALLOWED (true)**  
*Reason: Group enabled (default) + Channel enabled explicitly.*
```bash
curl -X POST http://localhost:3000/api/check-permission \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "topicId": "TOPIC_LOGIN_ID", "channel": "sms"}'
```

### Check 2: Login Alerts via Email
**Expected: BLOCKED (false)**  
*Reason: Group enabled + Channel NOT set (Default Blocked).*
```bash
curl -X POST http://localhost:3000/api/check-permission \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "topicId": "TOPIC_LOGIN_ID", "channel": "email"}'
```

### Check 3: Offers via Email
**Expected: BLOCKED (false)**  
*Reason: Group (Marketing) is DISABLED. Overrides channel setting.*
```bash
curl -X POST http://localhost:3000/api/check-permission \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "topicId": "TOPIC_OFFERS_ID", "channel": "email"}'
```

### Check 4: Offers via SMS
**Expected: BLOCKED (false)**  
*Reason: Group is DISABLED.*
```bash
curl -X POST http://localhost:3000/api/check-permission \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "topicId": "TOPIC_OFFERS_ID", "channel": "sms"}'
```

### Check 5: Invalid Channel
**Expected: 400 Bad Request**
```json
{
  "status": "error",
  "message": "Invalid channel: smoke_signal"
}
```
```bash
curl -X POST http://localhost:3000/api/check-permission \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "topicId": "TOPIC_LOGIN_ID", "channel": "smoke_signal"}'
```

### Check 6: Invalid User
**Expected: 404 Not Found**
```json
{
  "status": "error",
  "message": "User with id INVALID_ID not found"
}
```
```bash
curl -X POST http://localhost:3000/api/check-permission \
  -H "Content-Type: application/json" \
  -d '{"userId": "INVALID_ID", "topicId": "TOPIC_LOGIN_ID", "channel": "sms"}'
```

### Check 7: Cross-Organization Access
**Expected: 403 Forbidden**
*Reason: User belongs to a different organization than the topic.*
```json
{
  "status": "error",
  "message": "User does not belong to the same organization as the topic"
}
```
```bash
# Assuming USER_ID_ORG2 is a user from a different organization
curl -X POST http://localhost:3000/api/check-permission \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID_ORG2", "topicId": "TOPIC_LOGIN_ID", "channel": "sms"}'
```
