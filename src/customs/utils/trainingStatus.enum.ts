export enum TrainingStatusEnum {
    CREATED = 'CREATED', // description: antrenman oluşturuldu / icon-color: blue
    READY = 'READY', // description: antrenman cihaza iletildi ve başlatılmaya hazır / icon-color: yellow
    STARTED = 'STARTED', // description: Antrenman başladı / icon-color: orange
    COMPLETED = 'COMPLETED', // description: antrenman tamamlandı / icon-color: green
    CANCELLED = 'CANCELLED', // description: antrenman iptal edildi / icon-color: grey
    ERROR = 'ERROR' // description: antrenman sırasında bir hata oluştu / icon-color: red
}