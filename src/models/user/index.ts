import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn} from "typeorm"
import {Scrape} from "../scrape";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({type: "text"})
    name!: string

    @Column({type: "text"})
    email!: string

    @Column({type: "text"})
    password!: string

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at!: Date

    @OneToMany(() => Scrape, (scrape) => scrape.user)
    scrapes?: Scrape[]
}