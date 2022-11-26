import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Toko {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nama_toko:string

    @Column()
    no_telp:string

    @Column()
    alamat:string

    @UpdateDateColumn()
    update_at: Date;

    @CreateDateColumn()
    create_at: Date;

    @ManyToOne(() => User, u => u.toko, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user: User

    @OneToMany(()=> Product, p => p.toko, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    product: Product
}
