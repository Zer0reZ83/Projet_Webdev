import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';
import { Liste} from 'src/app/model/liste';  //on importe l'objet liste
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  taches: Array<Tache> = [];
  listes : Array<Liste> = []; //on déclare notre tableau de liste
  newTaches: Array<Tache> = []; //là ou on va mettre les nouvelles taches à ajouter
  
  newTache: Tache = {
    titre : '',
    termine : false,
    statut : ''
  };  
  
  filter:string = 'Tous';

  constructor(private tacheService: TachesService,
    private userService: UserService,
    private router: Router){ }
  
  ngOnInit(): void {
    this.tacheService.getTaches().subscribe({ 
      next: (data:Array<Tache>) => { this.taches = data; }
      
    });

  }  

  ajouter(tache : Tache) {  //ici on précise que le paramètre pris en compte par la fonction est un objet de type 
                            //Tache afin de pouvoir directement modifier ses attributs dans la fonction, au lieu de 
                            //dire qu'on ajoute un objet newTache préfait à l'avance comme précedemment. Plus 
                            //pratique car on peut directement choisir quel tache on ajoute 
    this.tacheService.ajoutTaches(tache).subscribe({
      next: (data) => {
        this.taches.push(data);
        tache.titre = '';
        tache.statut = 'test' //test
        
      }
    });
    
  }

  supprimer(tache: Tache): void {
    this.tacheService.removeTaches(tache).subscribe({
      next: (data) => {
        this.taches = this.taches.filter(t => tache._id != t._id);
      }
    });

  }

  modifier(tache: Tache) {
    tache.termine = !tache.termine;
    this.tacheService.updateTaches(tache).subscribe({
      next: (data) => {
      }
    });
  }

  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }

  change(filter:string) {
    this.filter = filter;
  }


}

