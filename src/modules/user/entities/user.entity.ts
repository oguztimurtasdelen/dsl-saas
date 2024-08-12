import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "src/customs/userrole.enum";

@Entity()
export class User {
    @ObjectIdColumn()
    id: string;

    @Column({unique: false})
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


