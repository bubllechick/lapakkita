import { Toko } from 'src/toko/entities/toko.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserProfile } from './userprofile.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nama: string;

    @Column()
    no_telp: string;

    @Column()
    password: string;

    @UpdateDateColumn()
    update_at: Date;

    @CreateDateColumn()
    create_at: Date;

    @OneToMany(() => UserProfile, usrp => usrp.user, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    userprofile: UserProfile

    @OneToMany(() => Toko, usrp => usrp.user, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    toko: Toko
}


