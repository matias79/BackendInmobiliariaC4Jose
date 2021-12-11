import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbInmobiliariaDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Asesor} from '../models';
import {AsesorRepository} from './asesor.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodbInmobiliaria') dataSource: MongodbInmobiliariaDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Inmueble, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
