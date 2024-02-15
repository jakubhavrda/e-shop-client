// configure Postgres database

import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "e-shop",
    password: "Kamen5000",
    port: 5432
  });
  
  db.connect();

module.exports == db;