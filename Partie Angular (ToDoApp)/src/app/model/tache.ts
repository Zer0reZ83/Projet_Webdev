export interface Tache {
  _id?:string;    //? car à la création de la tache, on ne connait pas son id
  titre:string;
  termine:boolean;
  statut?:string; //car à la création de la tache on ne connait pas directement son statut 
}


export class TacheImplement implements Tache{  //idem que pour listeImplement
  _id?: string;
  statut?: string;
  termine: boolean = false;
  titre: string = '';

  public constructor(init?: Partial<Tache>) {
    Object.assign(this, init);
  }
  
 }
