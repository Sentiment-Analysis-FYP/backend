import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {Scrape} from "../scrape";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    created_at!: Date

    @OneToMany(() => Scrape, (scrape) => scrape.user)
    scrapes?: Scrape[]
}