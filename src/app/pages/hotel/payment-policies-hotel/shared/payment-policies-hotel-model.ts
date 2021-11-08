import { CancellationOptionsModel } from '../cancellation-options/shared/cancellation-options.model';
import { GuestPaymentOptionsModel } from '../guest-payment-options/shared/guest-payment-options-model';
import { CancellationFeesModel } from '../cancellation-fees/shared/cancellation-fees.model';
import { CheckInCheckOutModel } from '../check-in-check-out/shared/check-in-check-out.model';
import { PetPolicyModel } from '../pet-policy/shared/pet-policy.model';
import { PaymentPoliciesHotelEnum } from './payment-policies-hotel-enum';
import { GenericFormModel } from '@shared/generic-form-model';
import { ChildrenPolicyModel } from '@hotel/payment-policies-hotel/children-policy/shared/children-policy.model';
import { CheckInCheckOutEnum } from '@hotel/payment-policies-hotel/check-in-check-out/shared/check-in-check-out.enum';
import { TimePickerModel } from '@hotel/payment-policies-hotel/check-in-check-out/shared/time-picker.model';

export class PaymentPoliciesHotelModel implements GenericFormModel {
    id: number;
    hotelServiceId: number;
    minimunStay: number = PaymentPoliciesHotelEnum.minimunStayDefaultValue; 
    cancellationOptions: CancellationOptionsModel;
    guestPaymentOptions: GuestPaymentOptionsModel;
    cancellationFees: CancellationFeesModel;
    checkInCheckOutInfo: CheckInCheckOutModel;
    childrenPolicy: ChildrenPolicyModel;
    petPolicy: PetPolicyModel;

    constructor() {
        this.id = null;
        this.hotelServiceId = null;
        this.minimunStay = PaymentPoliciesHotelEnum.minimunStayDefaultValue; 
        this.cancellationOptions = new CancellationOptionsModel();
        this.guestPaymentOptions = new GuestPaymentOptionsModel();
        this.cancellationFees = new CancellationFeesModel();
        this.checkInCheckOutInfo = new CheckInCheckOutModel();
        this.childrenPolicy = new ChildrenPolicyModel();
        this.petPolicy = new PetPolicyModel();
    }

    setData(detailsHotelModel: any): void {
        if(detailsHotelModel.politicConditions) {
            this.id = detailsHotelModel.politicConditions.id;
            this.hotelServiceId = detailsHotelModel.basicInfo.id;
            this.minimunStay = detailsHotelModel.politicConditions.minimunStay;
            
            if(detailsHotelModel.politicConditions.checkInCheckOutInfo) {
                this.initCheckInCheckOutInfo(detailsHotelModel.politicConditions.checkInCheckOutInfo);
            }

            if(detailsHotelModel.politicConditions.childrenPolicy) {
                this.initChildrenPolicy(detailsHotelModel.politicConditions.childrenPolicy);
            }

            if(detailsHotelModel.politicConditions.petPolicy) {
                this.initPetPolicy(detailsHotelModel.politicConditions.petPolicy);
            }

            if(detailsHotelModel.politicConditions.cancellationOptions) {
                this.initCancellationOptions(detailsHotelModel.politicConditions.cancellationOptions);
            }

            if(detailsHotelModel.politicConditions.cancellationFees) {
                this.initCancellationFees(detailsHotelModel.politicConditions.cancellationFees);
            }

            if(detailsHotelModel.politicConditions.guestPaymentOptions) {
                this.initGuestPaymentOptions(detailsHotelModel.politicConditions.guestPaymentOptions);
            }
        }
    }

    initCheckInCheckOutInfo(checkInCheckOutInfo : CheckInCheckOutModel) {
        this.checkInCheckOutInfo.checkInFromTime = checkInCheckOutInfo.checkInFromTime;
		this.checkInCheckOutInfo.checkInToTime = checkInCheckOutInfo.checkInToTime;
		this.checkInCheckOutInfo.checkOutFromTime = checkInCheckOutInfo.checkOutFromTime;
        this.checkInCheckOutInfo.checkOutToTime = checkInCheckOutInfo.checkOutToTime;
        this.initIds();
    }

    initChildrenPolicy(childrenPolicy : ChildrenPolicyModel) {
        this.childrenPolicy.childAllowed = childrenPolicy.childAllowed.toString();
    }

    initPetPolicy(petPolicy) {
        this.petPolicy.canYouBringPets = petPolicy.canYouBringPets ? petPolicy.canYouBringPets : null;
        this.petPolicy.petCharge = petPolicy.petCharge ? petPolicy.petCharge : null;
    }

    initCancellationOptions(cancellationOptions) {
        this.cancellationOptions.cancellationDays = cancellationOptions.cancellationDays ? cancellationOptions.cancellationDays : null;
        this.cancellationOptions.penality = cancellationOptions.penality ? cancellationOptions.penality : null;
    }

    initCancellationFees(cancellationFees) {
        this.cancellationFees.hasGracePeriod = (cancellationFees.hasGracePeriod).toString();
        this.cancellationFees.gracePeriod = cancellationFees.gracePeriod ? cancellationFees.gracePeriod.id : null;
    }

    initGuestPaymentOptions(guestPaymentOptions) {
        this.guestPaymentOptions = new GuestPaymentOptionsModel();
        
        this.guestPaymentOptions.chargeToYourCreditCard = guestPaymentOptions.chargeToYourCreditCard.toString();
        this.guestPaymentOptions.creditCardTypes = [];

        const creditCards = guestPaymentOptions.creditCardTypes;
        creditCards.forEach(element => {
            this.guestPaymentOptions.creditCardTypes.push(element.id);
        });
    }

    initIds() {
        let checkInCheckOutEnum = new CheckInCheckOutEnum;
        let toTimeOptions = checkInCheckOutEnum.toTimeOptions;
        let fromTimeOptions = checkInCheckOutEnum.fromTimeOptions;

        let element = fromTimeOptions.find(this.findIndexToUpdate, this.checkInCheckOutInfo.checkInFromTime)
        let index = fromTimeOptions.indexOf(element);
        if(index >= PaymentPoliciesHotelEnum.valueZero)
            this.checkInCheckOutInfo.checkInFromTimeId = (fromTimeOptions[index].id).toString();
        else {
            this.checkInCheckOutInfo.checkInFromTimeId = (fromTimeOptions[fromTimeOptions.length - PaymentPoliciesHotelEnum.valueOne].id).toString();
            let arrayString = this.checkInCheckOutInfo.checkInFromTime.split(PaymentPoliciesHotelEnum.separator, PaymentPoliciesHotelEnum.quantity);            
            this.checkInCheckOutInfo.initTimePickerFromCheckIn = this.initTimePicker(arrayString);
        }

        element = toTimeOptions.find(this.findIndexToUpdate, this.checkInCheckOutInfo.checkInToTime);
        index = toTimeOptions.indexOf(element);
        if(index >= PaymentPoliciesHotelEnum.valueZero)
            this.checkInCheckOutInfo.checkInToTimeId = (toTimeOptions[index].id).toString();
        else {
            this.checkInCheckOutInfo.checkInToTimeId = (toTimeOptions[toTimeOptions.length - PaymentPoliciesHotelEnum.valueOne].id).toString();
            let arrayString = this.checkInCheckOutInfo.checkInToTime.split(PaymentPoliciesHotelEnum.separator, PaymentPoliciesHotelEnum.quantity);            
            this.checkInCheckOutInfo.initTimePickerToCheckIn = this.initTimePicker(arrayString);
        }
        
        element = fromTimeOptions.find(this.findIndexToUpdate, this.checkInCheckOutInfo.checkOutFromTime);
        index = fromTimeOptions.indexOf(element);
        if(index >= PaymentPoliciesHotelEnum.valueZero)
            this.checkInCheckOutInfo.checkOutFromTimeId = (fromTimeOptions[index].id).toString();
        else {
            this.checkInCheckOutInfo.checkOutFromTimeId = (fromTimeOptions[fromTimeOptions.length - PaymentPoliciesHotelEnum.valueOne].id).toString();
            let arrayString = this.checkInCheckOutInfo.checkOutFromTime.split(PaymentPoliciesHotelEnum.separator, PaymentPoliciesHotelEnum.quantity);            
            this.checkInCheckOutInfo.initTimePickerFromCheckOut = this.initTimePicker(arrayString);
        }

        element = toTimeOptions.find(this.findIndexToUpdate, this.checkInCheckOutInfo.checkOutToTime);
        index = toTimeOptions.indexOf(element);
        if(index >= PaymentPoliciesHotelEnum.valueZero)
            this.checkInCheckOutInfo.checkOutToTimeId = (toTimeOptions[index].id).toString();
        else {
            this.checkInCheckOutInfo.checkOutToTimeId = (toTimeOptions[toTimeOptions.length - PaymentPoliciesHotelEnum.valueOne].id).toString();
            let arrayString = this.checkInCheckOutInfo.checkOutToTime.split(PaymentPoliciesHotelEnum.separator, PaymentPoliciesHotelEnum.quantity);            
            this.checkInCheckOutInfo.initTimePickerToCheckOut = this.initTimePicker(arrayString);
        }                
    }

    findIndexToUpdate(data) { 
        return data.name === this;
    }

    initTimePicker(arrayString) : TimePickerModel {
        let timePicker: TimePickerModel = new TimePickerModel();
        timePicker.hour = parseInt(arrayString[PaymentPoliciesHotelEnum.valueZero]);
        timePicker.minute = parseInt(arrayString[PaymentPoliciesHotelEnum.valueOne]);
        return timePicker;
    }
}