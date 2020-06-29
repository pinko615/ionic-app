import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // redirect
      const recipeId = paramMap.get('placeId');
      this.place = this.placesService.getPlace(recipeId);
    });

  }
  async deletePlace() {
    const alertElement = await this.alertController.create({
      header: 'Are you sure, you want to delete id?',
      message: 'Be careful',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.placesService.deletePlace(this.place.id);
            this.router.navigate(['/places']);
          }
        }
      ]
    });
    await alertElement.present();
  }

}
