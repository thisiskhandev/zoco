import { GenericFormModel } from "@shared/generic-form-model";
import { Utilities } from '@shared/utilities';
import { SettingsTransferEnum } from "./setting-transfer.enum";


export class SettingsTransferModel implements GenericFormModel {
  id: number;
  settingsList: Array <SettingsTransferItemModel>;

  constructor() {
    this.id = null;
    this.settingsList = [];
  }

  setData(data) {
    this.settingsList = data.settingsList;
  }
}

export class SettingsTransferItemModel {
  id: number;
  vehicleFeatureId: number;
  vehicleDescription: string;
  vehiclePlate: string;
  vehicleType: string;
  stopsOrPickups: number;
  availableHours: string;
  availableDays: string;
  bagLength: number;
  bagHeight: number;
  bagWidth: number;
  bagWeight: number;
  transferDriverId: number;
  driverName: string;
  haveChildren: string;
  allowPets: string;
  doorToDoor: string;
  day: number;
  night: number;

  constructor() {
    this.id = null;
    this.vehicleFeatureId = null;
    this.vehicleDescription = null;
    this.vehiclePlate = null;
    this.vehicleType = null;
    this.stopsOrPickups = null;
    this.availableHours = null;
    this.availableDays  = null;
    this.bagLength = null;
    this.bagHeight = null;
    this.bagWidth = null;
    this.bagWeight = null;
    this.transferDriverId = null;
    this.driverName = null;
    this.haveChildren = SettingsTransferEnum.no;
    this.allowPets = SettingsTransferEnum.no;
    this.doorToDoor = SettingsTransferEnum.no;
    this.day = SettingsTransferEnum.zero;
    this.night = SettingsTransferEnum.zero;
  }
}
