import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asesor} from './asesor.model';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  valor_venta: number;

  @property({
    type: 'number',
    required: true,
  })
  valor_alquiler: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
