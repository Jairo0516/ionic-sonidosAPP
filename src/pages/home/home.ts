import { Component } from '@angular/core';
import {ANIMALES} from "../../data/data.animales";

import {ANIMAL} from "../interfaces/interfaz.animal";
import { reorderArray } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //VARIABLES GLOBALES
  animales:ANIMAL[]=[];
  audio = new Audio();
  audioTiempo : any;
  ordenando:boolean=false;

  constructor() {
    this.animales=ANIMALES.slice(0);
  }



  //FUNCION CLICK EVENTO
  reproducir(animal:ANIMAL){

    //PAUSAR AUDIO
    this.pausarAudio( animal );

    if( animal.reproduciendo ){
      animal.reproduciendo=false;
      return;
    }

    //SIRECTORIO AUDIO
    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo=true;

    this.audioTiempo=setTimeout(()=> animal.reproduciendo=false, animal.duracion * 1000);

  }
  private pausarAudio( animalSelect:ANIMAL ){

    clearTimeout( this.audioTiempo );
    this.audio.pause();
    this.audio.currentTime=0;

    for(let animal of this.animales){
      if( animal.nombre != animalSelect.nombre){
        animal.reproduciendo=false;
      }
    }


  }
  eliminarAnimal( indx:number ){

    this.animales.splice(indx,1);
  }
  recargarAnimales( refresher : any){

    console.log('SE ESTA REALIZANDO');

    setTimeout(() => {
      console.log('COMPLETADO');

      //CARGAMOS ANIMALES
      this.animales=ANIMALES.slice(0);

      refresher.complete();
    }, 1500);
  }
  reordenarAnimales( indices:any ){

    this.animales = reorderArray( this.animales,indices );
  }

}
