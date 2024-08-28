import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Device {
    
    @ObjectIdColumn()
    _id: string;

    @Column({unique: false, nullable: false})
    macAddress: string;

    @Column({nullable: false})
    deviceCode: string;

    @Column({nullable: false})
    deviceName: string;

    @Column({nullable: true})
    description: string;
}
