import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn} from "typeorm"
import {Scrape} from "../scrape";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at!: Date

    @OneToMany(() => Scrape, (scrape) => scrape.user)
    scrapes?: Scrape[]
}