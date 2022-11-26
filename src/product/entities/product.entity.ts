import { Toko } from "src/toko/entities/toko.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    foto1:string

    @Column()
    foto2:string

    @Column()
    foto3:string

    @Column()
    foto4:string

    @Column()
    foto5:string

    @Column()
    nama_product:string

    @Column()
    harga:string

    @Column()
    kategori:string

    @Column()
    kondisi:string

    @Column()
    minimal_pesanan:string

    @Column()
    deskripsi: string

    @Column()
    promo: string

    @UpdateDateColumn()
    update_at: Date;

    @CreateDateColumn()
    create_at: Date;
    
    @ManyToOne(() => Toko, u => u.product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    toko: Toko
}
