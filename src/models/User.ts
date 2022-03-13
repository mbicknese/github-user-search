export default class User {
    constructor(
        public readonly name: string,
        public readonly login: string,
        public readonly bio: string = '',
        public readonly avatar: string = '',
        public readonly repositoryCount: number = 0,
        public readonly starCount: number = 0,
        public readonly quote?: string
    ) {}
}
