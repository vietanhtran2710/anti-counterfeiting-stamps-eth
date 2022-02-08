import { Component, OnInit } from '@angular/core';
import Moralis from 'moralis';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    console.log('clicked');
    Moralis.authenticate()
    .then(async (user) => {
      let currentAddress = user.get('ethAddress');
      console.log(currentAddress);
      if (currentAddress == environment.adminAddress.toLowerCase()) {
        this.router.navigate([`/admin`])
      }
      else {
        
      }
    })
  }

}
