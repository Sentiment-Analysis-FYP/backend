import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"


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
}