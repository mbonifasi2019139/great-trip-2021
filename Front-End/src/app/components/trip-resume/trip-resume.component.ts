import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripsService } from 'src/app/services/trips.service';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-trip-resume',
  templateUrl: './trip-resume.component.html',
  styleUrls: ['./trip-resume.component.scss'],
})
export class TripResumeComponent implements OnInit {

  @Input() id:string;
  price: Number;
  start_date:Date;
  title: String;
  urlImage: String;
  value: Number = 0;

  constructor(private modalCtrl: ModalController, private tripService: TripsService, private datepipe: DatePipe) { }

  ngOnInit() {
    console.log(this.id);
    this.tripService.getTrip(this.id).subscribe(resp =>{
      console.log(resp);
      this.title = resp.trip.title;
      this.price = resp.trip.price;
      this.start_date = resp.trip.start_date;
      this.urlImage = resp.trip.imageUrl;
    })
  }

  closeTripResumeModal(){
    this.modalCtrl.dismiss();
  }

  showDateInFormat(date): Date{
    date = this.datepipe.transform(this.start_date, "dd/MM/yyyy");
    return date;
  }

  async showTripFinalModal(price,value){
    const modal = await this.modalCtrl.create({
      component: PaymentComponent,
      componentProps: {price,value}
    });
    modal.present();
  }

  setValue(value: Number){
    this.value = value;
  }

}
