import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache, TacheImplement} from 'src/app/model/tache';
import { Liste, ListeImplement} from 'src/app/model/liste';  //on importe l'objet liste
import { ListeService } from "../../service/liste.service"; //on importe ListeService comme pour TacheService
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";  //on importe le drag and drop 

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  taches: Array<Tache> = [];
  listes : Array<Liste> = []; //on déclare notre tableau de liste
  newTaches: Array<Tache> = []; //là ou on va mettre les nouvelles taches à ajouter
  newListe: Liste = new ListeImplement(); // création de newListe
  
 /* newTache: Tache = { plus nécessaire maintenant qu'on à tacheImplement
    titre : '',
    termine : false,
    statut : ''
  };  */
  
  filter:string = 'Tous';

  constructor(private tacheService: TachesService,
    private userService: UserService,
    private listeService: ListeService, //on rajoute listeService ici comme tacheService pour pouvoir l'utiliser
    private router: Router){ }
  
  ngOnInit(): void {
    this.recupereListe();
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

  /* Partie perso */
  
  
  ajoutListe(): void {
    this.listeService.ajoutListe(this.newListe).subscribe({
      next: (data) => {
        this.listes.push(data);
        this.newListe.titre = '';
        this.newTaches.push(new TacheImplement({statut: data._id}));
      }
    });
  }


  
  supprimerListe(liste: Liste): void {
    this.listeService.removeListe(liste).subscribe({
      next: (data) => {
        this.listes = this.listes.filter(t => liste._id != t._id);
        this.newTaches = this.newTaches.filter(t => t.statut != liste._id);

      }
    });
  }


  
  recupereListe(): void { //permet de récupérer la liste des Listes dans la base de données et d'initialiser le nouvel objet de type Tache afin de faire en sorte que chaque liste à son propre modèle pour une nouvelle tache
    this.listeService.getListe().subscribe({
      next: (data: Array<Liste>) => {
        this.listes = data
        for (const dt of data) {
          this.newTaches.push(new TacheImplement({statut: dt._id}));
        }
      }
    });
  }



  drop(event: CdkDragDrop<string[]>) {  //permet de mettre en place le drag and drop
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    
    else {
      const elementId = event.item.element.nativeElement.id;
      const listeDroppedId = event.container.element.nativeElement.id;
      let droppedContainerID: Liste[] = this.listes.filter(t => t._id == listeDroppedId);

      if (droppedContainerID.length > 0) {
        const list: Liste = droppedContainerID[0];
        for (const tache of this.taches) {
          if (tache._id == elementId) {
            tache.statut = list._id;
            this.tacheService.updateTaches(tache).subscribe({
              next: (data) => {}
            });
            break;
          }
        }
      }
    }
  }


}