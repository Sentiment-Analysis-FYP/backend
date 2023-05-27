import {DataSource} from "typeorm";

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ["src/models/*/*.ts"],
    logging: true,
    synchronize: true
})