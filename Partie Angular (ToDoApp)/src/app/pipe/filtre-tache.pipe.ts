//les listes sont devenus dynamiques, donc il faut que le filtre le soit aussi

import { Pipe, PipeTransform } from '@angular/core';
import { Tache } from '../model/tache';

@Pipe({
  name: 'filtreTache',
  pure : false  //nécessaire pour pouvoir filtrer les nouveaux objets après un push
})
export class FiltreTachePipe implements PipeTransform {

  transform(value: Array<Tache>, filter?:string): Array<Tache> { //permet de filtrer toute les taches selon leur statut, et maintenant le filtre peut être = à "", donc on rajoute un ? après le filtre
    if (!value) {
      return value;
    }

    if (filter != '') {   //permet de tout retourner si le statut de la tache = "", permet que chaque filtre correspondent à un statut
      return value.filter( tache =>  tache.statut == filter)
    }

    return value;

  }

}