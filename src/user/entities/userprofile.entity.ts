import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    foto: string;

    @Column()
    no_telp: string;

    @Column()
    province: string;

    @Column()
    kabupaten: string;

    @Column()
    nama_lengkap: string;

    @Column()
    alamat: string;

    @Column()
    password: string;

    @UpdateDateColumn()
    update_at: Date;

    @CreateDateColumn()
    create_at: Date;

    @ManyToOne(() => User, u => u.userprofile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user: User
}
