import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Userprofile {
    @ObjectIdColumn()
    _id: string;

    @Column({nullable: false})
    userId: string

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    surname: string
}
