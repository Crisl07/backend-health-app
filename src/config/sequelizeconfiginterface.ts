export interface SequelizeConfig {
  database: string,
  username: string,
  password: string | null,
  params: {
    host: string,
    dialet: string,
    operatorsAliases: boolean
  }
}