export class Routine {
    constructor(
        public routineId: string,
        public name: string,
        public elements: string[],
        public createdAt: Date,
        public isShared: boolean
    ) { }
}