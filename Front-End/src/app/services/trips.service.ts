import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReponsegetLngLatTPByTripID, ReponseTrip, ResponseTrips, ResponseTripTouristPlace, ResponseTouristPlace } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  getTrips(){
    return this.http.get<ResponseTrips>(`${ URL }/v1/getTrips`);
  }

  getTrip(idTP){
    return this.http.post<ReponseTrip>(`${URL}/v1/getTrip/${idTP}`, {});
  }

  getLngLatTPByTripID(idT){
    return this.http.post<ReponsegetLngLatTPByTripID>(`${URL}/v1/getLngLatTPByTripID/${idT}`, {});
  }

  getTouristPlaceDetail(idTP){
    return this.http.post<ResponseTouristPlace>(`${URL}/v1/getTouristPlace/${idTP}`,{});
  }

  getTouristsPlacesTrips(idT){
    console.log(idT);
    return this.http.get<ResponseTripTouristPlace>(`${ URL }/v1/getTouristsPlacesTrips/${ idT }`);
  }
}
