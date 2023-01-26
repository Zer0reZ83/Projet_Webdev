//cette fois ci on créé l'objet liste dès le début pour pouvoir directement travailler avec

export interface Liste {
  _id?: string; //maintenant vu qu'on créer les listes une à une, leur id de base est inconnu
  titre: string;
}

export class ListeImplement implements Liste{  //on créer une nouvelle classe qui utilise l'interface de Liste afin de pouvoir crée des objets plus rapidement
  _id?: string;
  titre: string = '';

  public constructor(init?: Partial<Liste>) { //ici on dit que quand l'objet est crée, on lui assigne les valeurs l'objet initialiseur  
    Object.assign(this, init);
  }

}

