export class ListProductModel {
    id : number;
    transferId : number;
    brand : string;
    model : string;
    type : string;
    capacity : number;
    stock: number;

    constructor() {
        this.id = null;
        this.transferId = null;
        this.brand = null;
        this.model = null;
        this.type = null;
        this.capacity = null;
        this.stock = null;
    }
}