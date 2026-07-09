import { TrainingTypeEnum } from "../training/enums/trainingType.enum";

export type DeviceType = {
    macAddress: string;
    trainingType: TrainingTypeEnum;
    deviceCode: string;
    deviceName: string;
    deviceStatus: string;
    firmwareVersion: string;
    description: string;
}