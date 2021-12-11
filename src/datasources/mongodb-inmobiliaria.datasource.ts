import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodbInmobiliaria',
  connector: 'mongodb',
  url: 'mongodb+srv://Josetic:jose3079@clusterretos1.ljupe.mongodb.net/BaseDatosInmobiliaria?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbInmobiliariaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodbInmobiliaria';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodbInmobiliaria', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
