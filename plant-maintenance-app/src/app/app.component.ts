import { Component, ViewChild, ElementRef, HostListener, Injectable } from '@angular/core';
import { PlantInfoServices } from './plant-info.services';
import { Observable, of, interval } from 'rxjs';
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
  plantWatered: boolean[];
  timer = [];
  data: any;// = new Array<PlantInfoModel>();
  timeInterval = new Array();
  buttonDisableTimer = new Array();
  timeToWaterPlant = new Array();
  timeIntervelWaterPlantReset = new Array();
  startWatering = "Start watering";
  stopWatering = "Stop watering";
  plantWateringStatusTracker: any;
  remindToWater: number = 21600000 //6 hrs
  timeTodisableWateringAfterWatering = 30000 //30 sec
  timeToWater = 1000 //10 sec
  @ViewChild('wateringButton') wateringButton: ElementRef;

 
  constructor(public plantInfoServices:PlantInfoServices){

  }

  ngOnInit(): void {
    this.plantInfoServices.getPlantInfo<PlantInfoModelList>().subscribe(d => {
      this.data = d;
      this.wateringNow = new Array<boolean>(this.data.length).fill(false);
      this.plantWatered = new Array<boolean>(this.data.length).fill(false);
      this.buttonDisableTimer = new Array<boolean>(this.data.length).fill(false);
      this.timer = new Array(this.data.length).fill(10);
      this.timeIntervelWaterPlantReset = new Array(this.data.length).fill(this.remindToWater);
      this.plantWateringStatusTracker = new Array(this.data.length);
      this.timeInterval = new Array(this.data.length);
      this.timeToWaterPlant = new Array(this.data.length);


      setInterval (() => {
        for(let i = 0; i < this.timeToWaterPlant.length; i++)
        {
          if(this.plantWatered[i]){
            this.plantWatered[i] = false;
            this.plantWateringStatusTracker[i] = false;
          }
          else
            this.plantWateringStatusTracker[i] = true;
        }
      }, this.remindToWater);
    })

    
  }

  onWateringStatusChanged(plantId){
    this.wateringNow[plantId] = !this.wateringNow[plantId];
    this.plantWatered[plantId] = true;
    this.plantWateringStatusTracker[plantId] = false;
    if(this.wateringNow[plantId])
    {
      this.timeInterval[plantId] =  setInterval(()=>{
        this.timer[plantId] = this.timer[plantId] - 1
        if(this.timer[plantId] == 0)
          this.resetWatering(plantId)
        console.log(this.timer);
      }, this.timeToWater);
    }
    else{
      this.resetWatering(plantId)
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
    }, this.timeTodisableWateringAfterWatering);
    console.log(this.timer);
  }

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log('button', btn, 'number of clicks:');
 }
}
