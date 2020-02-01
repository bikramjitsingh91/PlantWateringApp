import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plant-maintenance-app';
  plants = [1,2,3,4,5];
  wateringNow: boolean[];
  timer = [];
  timeInterval = new Array();
  startWatering = "Start watering";
  stopWatering = "Stop watering";
  @ViewChild('wateringButton') wateringButton: ElementRef;
  constructor(){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.wateringNow = new Array<boolean>(this.plants.length).fill(false);
    this.timer = new Array(this.plants.length).fill(10);
    this.timeInterval = new Array(this.plants.length);
    
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
    console.log(this.timer);
  }

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log('button', btn, 'number of clicks:');
 }
}
