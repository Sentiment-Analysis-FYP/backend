import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {User} from "../user";


@Entity()
export class Scrape {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    title!: string

    @Column({type: "timestamp"})
    created_at!: Date

    @Column({type: "bytea"})
    file?: Buffer

    @ManyToOne(() => User, (user) => user.scrapes)
    user!: User
}