import e from 'express';
import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'it.darkangle.19',
    database: "blog"
})