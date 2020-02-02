import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class  PlantInfoServices{
    headers = new HttpHeaders();
    constructor(
        public http: HttpClient,
    ){
        this.headers = this.headers.set('Access-Control-Allow-Origin','*')
        //this.headers = this.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    getPlantInfo<PlantInfoModelList>(){
        return this.http.get<PlantInfoModelList>('http://localhost:50088/PlantInfo', {headers: this.headers});
    }
}