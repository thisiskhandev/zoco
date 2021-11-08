import { BreakfastList } from "./breakfast-list";

export class BreakfastModel {
    hasBreakfast: number = null;
    breakfastList: Array<BreakfastList>;

    constructor() {
        this.hasBreakfast = null;
        this.breakfastList = [];
    }
}

