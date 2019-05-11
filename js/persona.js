
export default class Persona{
    constructor(persona){
        this._id = persona.id;
        this._personaNombre = persona.personaNombre;
        this._personaEmail = persona.personaEmail;        
        this._personaFnacimiento =  persona.personaFnacimiento;
    }

    get id(){
        return this._id;
    }
    get personaNombre(){
        return this._personaNombre;
    }
    get personaEmail(){
        return this._personaEmail;
    }
    get personaFnacimiento(){
        return this._personaFnacimiento;
    }

    getFAsString() {
        console.log(this._personaFnacimiento);
        let F =
          this._personaFnacimiento.getDate() +
          "/" +
         (this._personaFnacimiento.getMonth()+1) +
          "/" +
          this._personaFnacimiento.getFullYear();
    
        return F;
      }
}
