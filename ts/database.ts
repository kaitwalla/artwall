import { Database } from "sqlite3";

export default class DB {
  db: Database;
  constructor() {
    this.db = new Database("art.db");
  }
}
