import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column({ nullable: true })
    image: string;
}
