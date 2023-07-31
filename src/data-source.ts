import {DataSource} from "typeorm";
import path from "path";

const dotenv = require('dotenv');

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, 'models', '**', '*.{ts,js}')],
    logging: true,
    synchronize: false
})