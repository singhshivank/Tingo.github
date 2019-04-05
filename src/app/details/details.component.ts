import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApidataService } from "../apidata.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  productid:any;
  apidata:any;
  products:any;
  Pdetails:any;

  constructor(public servicedata: ApidataService,private router: Router,public route: ActivatedRoute) { }

  ngOnInit() {
    this.productid= parseInt(this.route.snapshot.paramMap.get('Pid'));
    console.log(this.productid);

    this.servicedata
    .getproducts()
    .pipe()
    .subscribe(value => {
      this.apidata = value;
      //  console.log("leys are here ", Object.keys(this.apidata));
      this.products = Object.keys(this.apidata).map(apidata => {
        return this.apidata[apidata];
      });
      console.log(this.products);
      this.getproductdetails();
    });

    if(localStorage.getItem('isLoggedIn')=="false"){
      this.router.navigate(['/login']);
    }    
  }

  getproductdetails(){
    this.Pdetails=[];
    this.products.map((product)=>{
      if(product.Pid == this.productid){
          this.Pdetails.push(product)
          console.log(this.Pdetails);          
      }
    })
  }

  arrystar(n: number): any[] {
    return Array(n);
  }

}
