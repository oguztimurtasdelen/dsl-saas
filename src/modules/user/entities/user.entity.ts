import { Column, Entity, ObjectIdColumn } from "typeorm";
import { UserRole } from "src/customs/userrole.enum";

@Entity()
export class User {
    @ObjectIdColumn()
    _id: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Athlete
    })
    userRole: UserRole;

    @Column({default: false})
    isEmailVerified: boolean

    @Column({default: true})
    isActive: boolean
}


