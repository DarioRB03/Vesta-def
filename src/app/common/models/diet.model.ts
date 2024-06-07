export class Diet {
    constructor(
        public dietId: string,
        public name: string,
        public elements: string[],
        public createdAt: Date,
        public isShared: boolean
    ) { }
}