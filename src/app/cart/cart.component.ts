import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApidataService } from "../apidata.service";
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  apidata:any;
  userid:any;
  allcart:any;
  showcart:boolean=false;

  products:any;

  cartproducts:any;
  cartproid:any;

  url:any;
  

  constructor(public route: ActivatedRoute,private router: Router,public authService: AuthService,public servicedata: ApidataService) { }

  ngOnInit() {
    this.userid= parseInt(this.route.snapshot.paramMap.get('uid'));

    this.servicedata
      .getcart()
      .pipe()
      .subscribe(value => {
        this.apidata = value;
        //  console.log("leys are here ", Object.keys(this.apidata));
        this.allcart = Object.keys(this.apidata).map(apidata => {
          return this.apidata[apidata];
        });
        // console.log(this.allcart);
      });

      this.servicedata
      .getproducts()
      .pipe()
      .subscribe(value => {
        this.apidata = value;
        //  console.log("leys are here ", Object.keys(this.apidata));
        this.products = Object.keys(this.apidata).map(apidata => {
          return this.apidata[apidata];
        });
        this.getcart()
        // console.log("from header",this.products);
      });

        
    if(localStorage.getItem('isLoggedIn')=="false"){
      this.router.navigate(['/login']);
    }
      
  }

  getcart(){

    this.cartproducts=[];
    // console.log(this.allcart);
    
    this.allcart.map(ele=>{
      if (ele.id == this.userid){
        this.cartproid = Object.keys(ele.pid).map(elem => {
          return ele.pid[elem];
        });
      }
    })

    console.log("true value",this.cartproid);
    
    // console.log("header" ,this.products);
    // console.log("all product ids",this.cartproid);
    this.cartproid.map((ele )=>{
      // console.log("sdkuhhu",ele);
      
      this.products.map((pro)=>{
        // console.log("dgjgjsdg",pro.Pid);
        
        if(pro.Pid==ele){
           this.cartproducts.push(pro)
        }
      })
    })
    // console.log("all products",this.cartproducts);   
    
  }
  
  arrystar(n: number): any[] {
    return Array(n);
  }

  remove(id){
    alert(id);
    this.cartproducts=[];
    // console.log(this.allcart);
    
    this.allcart.map(ele=>{
      if (ele.id == this.userid){
        this.cartproid = Object.keys(ele.pid).map(elem => {
          return ele.pid[elem];
        });
      }
    })

    // console.log("true value",this.cartproid);
    
    // console.log("header" ,this.products);
    // console.log("all product ids",this.cartproid);
    this.cartproid.map((ele,index)=>{ 
      // console.log("sdkuhhu",ele);
      if (ele == id){
    this.url = "https://tingo-b5483.firebaseio.com/cart/cart"+this.userid+"/pid/"+index+".json"
      //  console.log(this.url);
       this.servicedata.removefromcart(this.url).pipe().subscribe()    
      // this.getcart();
      }
      


      
    })
    

    
  }
  

}
