import { Component, OnInit } from '@angular/core';
import Moralis from 'moralis';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StampService } from '../services/stamp/stamp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private stampService: StampService) { }

  ngOnInit(): void {
  }

  signIn() {
    console.log('clicked');
    let that = this;
    Moralis.authenticate()
    .then(async (user) => {
      let currentAddress = user.get('ethAddress');
      console.log(currentAddress);
      if (currentAddress == environment.adminAddress.toLowerCase()) {
        this.router.navigate([`/admin`])
      }
      else {
        this.stampService.isCreator(currentAddress).then(function (result) {
          if (result == true) {
            that.router.navigate([`/creator`])
          }
        })
        this.stampService.isValidator(currentAddress).then(function (result) {
          if (result == true) {
            that.router.navigate([`/validator`])
          }
        })
      }
    })
  }

}
