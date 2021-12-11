import { Asesor } from './../models/asesor.model';
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { AsesorRepository } from '../repositories';
const generador = require("password-generator"); //hacer un require hacia el pasword-generator
const cryptoJs = require("crypto-js"); //se importa el paquete crypto
const jwt = require("jsonwebtoken");
import { Llaves } from '../config/llaves';
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository
  ) {}

  

  GeneradorClave(){
    let clave = generador(8,false); //el 8 es la cantidad de digitos de la clave y false es intencidad
    return clave;
  }


  cifrarClave(clave:string){
    let claveCifrada = cryptoJs.MD5(clave).toString(); //se define variable y es igual al critojs definodo anteriormente md5 es un metod de cifrado
    return claveCifrada;
  }

  IdentificarAsesor(usuario: string, clave: string){
    try{
      let p = this.asesorRepository.findOne({where:{correo:usuario,clave:clave}});
      if(p){
        return p;
      }
      return false;

    }catch{
      return false;
    }
  }
  GenerarTokenJWT(asesor:Asesor){
    let token = jwt.sign({
      data:{
        id:asesor.id,
        correo: asesor.correo,
        nombre: asesor.nombres + " " + asesor.apellidos,
        telefono: asesor.telefono
      }//firma hasta aqui, va a src y crea una carpeta config y dentro archivo llaves.ts
    },
      Llaves.calveJWT);
  }

  validarTokenJWT(token: string){
    try{
     let datos = jwt.verify(token, Llaves.calveJWT)
     return datos;
    }catch{
      return false;
    }
  }
  ///////////////////////////////////////////////////////////////////////
  

  ///////////////////////////////////////////////////////////////////////

}
// qfuedo en minuto 16//////////////////////////////////
