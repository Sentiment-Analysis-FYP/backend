import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from "typeorm"
import {User} from "../user";


@Entity()
export class Scrape {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    title!: string

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at!: Date

    @Column({type: "bytea"})
    file?: Buffer

    @ManyToOne(() => User, (user) => user.scrapes)
    user!: User
}