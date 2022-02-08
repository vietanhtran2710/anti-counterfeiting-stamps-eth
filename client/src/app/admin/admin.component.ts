import { Component, OnInit } from '@angular/core';
import Moralis from 'moralis';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user/user.service';
import { StampService } from '../services/stamp/stamp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loaded = false;
  admin = environment.adminAddress;
  stamp = environment.stampAssress;
  validators = [];
  creators = [];
  validatorAddress = "";
  creatorAddress = "";
  currentAccount = "";
  balance;

  constructor(private router: Router,
              private userService: UserService,
              private stampService: StampService) { }

  ngOnInit(): void {
    this.currentAccount = Moralis.User.current().get('ethAddress');
    this.userService.getAccountsByRole("CREATOR")
    .subscribe(data => {
      this.creators = data as any;
    })
    this.userService.getAccountsByRole("VALIDATOR")
    .subscribe(data => {
      this.validators = data as any;
    })
    let that = this;
    this.stampService.getEthBalance(this.currentAccount)
    .then(result => {
      that.balance = Math.round(((result as any) / 1000000000000000000 + Number.EPSILON) * 100) / 100;
      this.loaded = true;
    })
    
  }

  logOut() {
    Moralis.User.logOut().then(() => {
      const currentUser = Moralis.User.current();
      this.router.navigate([`/login`])
    });
  }

  removeCreator() {

  }

  removeValidator() {

  }

  addCreator() {
    let data = {
      address: this.creatorAddress,
      role: "CREATOR"
    }
    let that = this;
    this.userService.createAccount(data)
    .subscribe(result => {
      if (result) {
        this.stampService.addCreator(this.creatorAddress, this.currentAccount)
        .then(function(result) {
          if (result) {
            Swal.fire(
              'Creator added successfully!',
              `Account address ${that.creatorAddress}`,
              'success'
            )
            .then(result => {
              window.location.reload();
            })
          }
        })
      }
    })
  }

  addValidator() {
    let data = {
      address: this.validatorAddress,
      role: "VALIDATOR"
    }
    let that = this;
    this.userService.createAccount(data)
    .subscribe(result => {
      if (result) {
        this.stampService.addValidator(this.validatorAddress, this.currentAccount)
        .then(function(result) {
          if (result) {
            Swal.fire(
              'Validator added successfully!',
              `Account address ${that.validatorAddress}`,
              'success'
            )
            .then(result => {
              window.location.reload();
            })
          }
        })
      }
    })
  }

}
