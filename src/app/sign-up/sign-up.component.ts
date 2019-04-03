import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newUser: FormGroup;
  constructor() { }

  ngOnInit() {
    this.newUser = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),

    })
  }

}
