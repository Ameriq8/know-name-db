import postgres from 'postgres';
import Logger from './Logger';
import { IConnectionDetails } from './utils/interfaces';

export class Client {
  public logger: Logger;

  private host: string;
  private port: number;
  private database: string;
  private username: string;
  private password: string;

  public sql: postgres.Sql<{}>;

  constructor(connectionDetails: IConnectionDetails) {
    this.logger = Logger.getLogger();
    this.host = connectionDetails.host;
    this.port = connectionDetails.port;
    this.database = connectionDetails.database;
    this.username = connectionDetails.username;
    this.password = connectionDetails.password;
    this.connect();
  }

  public getConnectionDetails(): IConnectionDetails {
    return {
      host: this.host,
      port: this.port,
      database: this.database,
      username: this.username,
      password: this.password,
    };
  }

  private connect(): void {
    this.logger.info('Connecting to postgresql database...');
    this.sql = postgres(this.getConnectionDetails());
    Logger.getLogger().success('4Database connected');
  }

  async db(query: string) {
    this.logger.debug(query);
  }
}

// export default new Client({
//   host: 'localhost',
//   port: 3002,
//   database: '4db',
//   username: 'postgres',
//   password: 'Ameriq81',
// });