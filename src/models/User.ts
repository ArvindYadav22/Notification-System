import { UserRole } from './types';

export class User {
    constructor(
        public id: string,
        public organizationId: string,
        public email: string,
        public role: UserRole
    ) { }
}
