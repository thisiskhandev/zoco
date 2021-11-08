export class InMemoryDataService {
      createDb() {

        const creditCardTypes = [
            { id: 1, name: 'Visa',                 urlImage: 'assets/img/app/hotel-payment-and-policies/visa.png'},
            { id: 2, name: 'Euro/MasterCard',      urlImage: 'assets/img/app/hotel-payment-and-policies/master.png'},
            { id: 3, name: 'Discover',             urlImage: 'assets/img/app/hotel-payment-and-policies/discover.png'},
            { id: 4, name: 'American Express',     urlImage: 'assets/img/app/hotel-payment-and-policies/americanExpress.png'},
            { id: 5, name: 'Dinners Club',         urlImage: 'assets/img/app/hotel-payment-and-policies/dinners.png'},
            { id: 6, name: 'UnionPay credit card', urlImage: 'assets/img/app/hotel-payment-and-policies/union.pay.png'},
        ];


        const cancellationDays = [

            { id: 1, name: 'Day of Arrival (6 pm)' },
            { id: 2, name: '1 day' },
            { id: 3, name: '2 days' },
            { id: 4, name: '3 days' },
            { id: 5, name: '7 days' },
            { id: 6, name: '14 days' }

        ];

        const gracePeriodOptions = [

            { id: 1, name: '1 Hour After Booking: Takes care of instant cancellation requests' },
            { id: 2, name: '4 Hours After Booking: Covers most accidental bookings' },
            { id: 3, name: '24 Hours After Booking: Protects you from the highest amount of cancellation requests' }

        ];

        const fromTimeOptions = [
            { id: 1, name: '12:00' },
            { id: 2, name: '14:00' },
            { id: 3, name: '15:00' },
            { id: 4, name: 'Other (7:00 AM a 8PM)' } 
        ];

        const toTimeOptions = [
            { id: 1, name: '12:00' },
            { id: 2, name: '22:00' },
            { id: 3, name: '00:00' },
            { id: 4, name: 'Other (12:00 PM a 12AM)' } 
        ];

        const listRoomTypeByStablishment = [
            {"id":1,"hotelServiceId":1,"totalRoomMeasure":180,"unitOfMeasurement":"Square meters","price":300,"roomInfo":{"roomType":{"id":12,"room_type_description":"Deluxe Room","created_at":null,"updated_at":null,"deleted_at":null},"roomName":{"id":16,"name":"Deluxe King Room"},"quantity":65,"roomPeopleQuantity":4,"customName":"","smokingPolicyDescription":"no smoking","hasSmokingPolicy":true},"bedInfo":[{"id":4,"item_name":"King bed(s) ","measure":"181-210 cm wide","itemQuantity":2,"itemPeopleQuantity":1},{"id":6,"item_name":"Sofa bed","measure":"Variable Size","itemQuantity":2,"itemPeopleQuantity":1}],"spaces":{"livingQuantity":1,"bathQuantity":1}}
            ,{"id":2,"hotelServiceId":1,"totalRoomMeasure":130,"unitOfMeasurement":"Square meters","price":300,"roomInfo":{"roomType":{"id":7,"room_type_description":"Double Room","created_at":null,"updated_at":null,"deleted_at":null},"roomName":{"id":23,"name":"Double Room (adult +\u00a0child)"},"quantity":65,"roomPeopleQuantity":4,"customName":"","smokingPolicyDescription":"no smoking","hasSmokingPolicy":true},"bedInfo":[{"id":4,"item_name":"King bed(s) ","measure":"181-210 cm wide","itemQuantity":1,"itemPeopleQuantity":2}],"spaces":{"livingQuantity":0,"bathQuantity":1}}
            ,{"id":3,"hotelServiceId":1,"totalRoomMeasure":140,"unitOfMeasurement":"Square meters","price":400,"roomInfo":{"roomType":{"id":6,"room_type_description":"Single Room","created_at":null,"updated_at":null,"deleted_at":null},"roomName":{"id":66,"name":"Standard King Room"},"quantity":65,"roomPeopleQuantity":2,"customName":"","smokingPolicyDescription":"no smoking","hasSmokingPolicy":true},"bedInfo":[ {"id":3,"item_name":"Queen bed(s)","measure":"151-180 cm wide","itemQuantity":2,"itemPeopleQuantity":2}],"spaces":{"livingQuantity":0,"bathQuantity":1}} 
        ];


        return {  creditCardTypes, cancellationDays, gracePeriodOptions, fromTimeOptions, toTimeOptions, listRoomTypeByStablishment };
      }
    }
