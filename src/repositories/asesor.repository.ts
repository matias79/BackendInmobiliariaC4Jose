import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbInmobiliariaDataSource} from '../datasources';
import {Asesor, AsesorRelations, Administrador, Cliente, Inmueble} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {ClienteRepository} from './cliente.repository';
import {InmuebleRepository} from './inmueble.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Asesor.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Asesor.prototype.id>;

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongodbInmobiliaria') dataSource: MongodbInmobiliariaDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Asesor, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
