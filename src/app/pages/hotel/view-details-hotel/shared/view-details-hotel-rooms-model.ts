export class ListRoomsModel {
    price: number;
    roomPeopleQuantity: number;
    room_type: string;
    living_quantity: number;
    bath_quantity: number;
    room_name: string;
    number_of_this_room: number;
    size: number;
    measure: string;

    constructor(data: any) {
        this.price = data.price;
        this.room_type = data.roomInfo.roomType.room_type_description;
        this.roomPeopleQuantity = data.roomInfo.roomPeopleQuantity;
        this.living_quantity = data.spaces.livingQuantity;
        this.bath_quantity = data.spaces.bathQuantity;
        this.room_name = data.roomInfo.roomName.name;
        this.number_of_this_room = data.roomInfo.quantity;
        this.size = data.totalRoomMeasure;
        this.measure = data.unitOfMeasurement.name;
    }

}
