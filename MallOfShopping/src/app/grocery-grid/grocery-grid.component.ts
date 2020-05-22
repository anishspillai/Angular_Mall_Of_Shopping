import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {IndividualGrocery} from "../individual-grocery/model/IndividualGrocery";
import {Order} from "../individual-grocery/model/Order";
import {MenuItem} from "primeng/api";
import {AngularFireDatabase} from "@angular/fire/database";
import {ActivatedRoute} from "@angular/router";
import {firestore} from "firebase";

@Component({
  selector: 'app-grocery-grid',
  templateUrl: './grocery-grid.component.html',
  styleUrls: ['./grocery-grid.component.css']
})
export class GroceryGridComponent implements OnInit{

  title = 'MallOfShopping';
  items: Observable<any[]>;
  anish: IndividualGrocery[] = [new IndividualGrocery()]
  kooi: IndividualGrocery[] = []
  nonFilteredList: IndividualGrocery[] = []

  orderedList: Order[] = []

  displayProgressSpinner = false


  seen:[] = []

  name: string;

  searchCategoryType: string


  crumbTrails: MenuItem[];

  home: MenuItem;

  ngOnInit() {

    var one: IndividualGrocery = new IndividualGrocery()
    one.brandName = "One"
    one.actualPrice = 897
    one.offerPrice = 0
    one.weight = 7.8
    one.unitOfWeight = "Kg"
    one.type = "rice"
    one.id = "One"

    this.anish.push(one)

    var two: IndividualGrocery = new IndividualGrocery()
    two.brandName = "One"
    two.actualPrice = 897
    two.offerPrice = 0
    two.weight = 7.8
    two.unitOfWeight = "Kg"
    two.type = "rice"
    two.id = "Two"

    this.anish.push(two)

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.searchCategoryType = params.get("groceryType")
      //this.fetchGroceries()
    })
  }

  constructor(private  readonly firestore: AngularFireDatabase, private activatedRoute: ActivatedRoute) {
    this.seen = []



    this.crumbTrails = [
      {label:'Categories'},
      {label:'Sports'},
      {label:'Football'},
      {label:'Countries'},
      {label:'Spain'},
      {label:'F.C. Barcelona'},
      {label:'Squad'},
      {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link'}
    ];



  }

  callMe(): void {
    alert(this.orderedList.length)
  }

  filterProduct(searchString: string) {
    this.anish = this.nonFilteredList.filter(value => value.brandName.toLowerCase().includes(searchString.toLowerCase()))
  }

  fetchGroceries() {
  this.displayProgressSpinner = true
  this.anish = []
    if(!this.searchCategoryType) {

      this.firestore.list('admin/Catagories').valueChanges().forEach(value => value.forEach(value1 => {
          for (let val of Object.values(value1)) {
            val.forEach(value2 => {
              var anish: IndividualGrocery = value2 as IndividualGrocery
              this.anish.push(anish)
              this.nonFilteredList.push(anish)
            })
          }
          this.displayProgressSpinner = false
        }
      )).then(r => console.log(r))
    } else {

      this.firestore.list('admin/Catagories/' + this.searchCategoryType).valueChanges().forEach(grocery => {
        grocery.forEach(grocery1 => {
          var anish: IndividualGrocery = grocery1 as IndividualGrocery
          this.anish.push(anish)
        })

        this.displayProgressSpinner = false
      }).then(r => console.log(r))
     }
  }

}
