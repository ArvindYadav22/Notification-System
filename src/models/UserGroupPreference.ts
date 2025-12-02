export class UserGroupPreference {
    constructor(
        public userId: string,
        public groupId: string,
        public enabled: boolean
    ) { }
}
