import { Component, ViewChild, ElementRef, HostListener, Injectable } from '@angular/core';
import { PlantInfoServices } from './plant-info.services';
import { Observable, of } from 'rxjs';
import { PlantInfoModel, PlantInfoModelList } from 'src/model/plant-info-model';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'plant-maintenance-app';
  plants = [1,2,3,4,5];
  wateringNow: boolean[];
  timer = [];
  data: any;// = new Array<PlantInfoModel>();
  timeInterval = new Array();
  buttonDisableTimer = new Array();
  startWatering = "Start watering";
  stopWatering = "Stop watering";
  @ViewChild('wateringButton') wateringButton: ElementRef;

 
  constructor(public plantInfoServices:PlantInfoServices){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.plantInfoServices.getPlantInfo<PlantInfoModelList>().subscribe(d => {
      this.data = d;
      this.wateringNow = new Array<boolean>(this.data.length).fill(false);
      this.buttonDisableTimer = new Array<boolean>(this.data.length).fill(false);
      this.timer = new Array(this.data.length).fill(10);
      this.timeInterval = new Array(this.data.length);
      console.log(this.wateringNow);
    })

    
  }

  ngAfterViewInit() {
    console.log(this.wateringButton.nativeElement.innerHTML);
  }

  onWateringStatusChanged(plantId){
    this.wateringNow[plantId] = !this.wateringNow[plantId];
    if(this.wateringNow[plantId])
    {
    //   setTimeout (() => {
    //     console.log("Hello from setTimeout");
    //  }, 1000);
      this.timeInterval[plantId] =  setInterval(()=>{
        this.timer[plantId] = this.timer[plantId] - 1
        if(this.timer[plantId] == 0)
          this.resetWatering(plantId)
        console.log(this.timer);
      }, 1000);
    }
    else{
      this.resetWatering(plantId)
      // if(this.timeInterval[plantId]){
      //   clearInterval(this.timeInterval[plantId]);
      // }
      // this.timer[plantId] = 10
      // console.log(this.timer);
    }
  }

  resetWatering(plantId){
    if(this.timeInterval[plantId]){
      clearInterval(this.timeInterval[plantId]);
    }
    this.timer[plantId] = 10
    this.wateringNow[plantId] = false;
    this.buttonDisableTimer[plantId] = true;
    setTimeout (() => {
      this.buttonDisableTimer[plantId] = false;
      console.log("Hello from setTimeout");
    }, 30000);
    console.log(this.timer);
  }

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log('button', btn, 'number of clicks:');
 }
}
