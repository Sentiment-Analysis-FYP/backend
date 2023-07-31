import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, PrimaryColumn} from "typeorm"
import {User} from "../user";


@Entity()
export class Scrape {
    @PrimaryColumn({type: "text"})
    id!: string

    @Column({type: "text"})
    title?: string

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    created_at!: Date

    // @Column({type: "bytea"})
    // file?: Buffer

    @ManyToOne(() => User, (user) => user.scrapes)
    user!: User
}