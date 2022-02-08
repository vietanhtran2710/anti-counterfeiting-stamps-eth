import { Component, OnInit } from '@angular/core';
import { StampService } from '../services/stamp/stamp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  secretCode = "";
  serialNumber = "";

  constructor(private stampService: StampService) { }

  ngOnInit(): void {
  }

  checkSerialNumber() {
    let that = this;
    this.stampService.isSerialNumberValid(this.serialNumber)
    .then(function(result) {
      if (!result) {
        Swal.fire(
          'Invalid serial number!',
          `This serial number is not valid`,
          'error'
        )
      }
      else {
        that.stampService.isSerialNumberActivated(that.serialNumber)
        .then(function(result) {
          if (result) {
            Swal.fire(
              'Serial number activated!',
              `This serial number is already activated by someone else`,
              'error'
            )
          }
          else {
            Swal.fire(
              'Serial number is valid!',
              `This serial number is valid and isn't activated yet`,
              'success'
            )
          }
        })
      }
    })
  }

  checkCode() {
    let that = this;
    this.stampService.isCodeValid(this.secretCode)
    .then(function(result) {
      if (!result) {
        Swal.fire(
          'Invalid code!',
          `This code is not valid`,
          'error'
        )
      }
      else {
        that.stampService.isCodeActivated(that.secretCode)
        .then(function(result) {
          if (result) {
            Swal.fire(
              'Code activated!',
              `This code is already activated by someone else`,
              'error'
            )
          }
          else {
            Swal.fire(
              'Code is valid!',
              `This code is valid and isn't activated yet`,
              'success'
            )
          }
        })
      }
    })
  }

  activateCode() {
    let that = this;
    this.stampService.isCodeValid(this.secretCode)
    .then(function(result) {
      if (!result) {
        Swal.fire(
          'Invalid code!',
          `This code is not valid`,
          'error'
        )
      }
      else {
        that.stampService.isCodeActivated(that.secretCode)
        .then(function(result) {
          if (result) {
            Swal.fire(
              'Code activated!',
              `This code is already activated by someone else`,
              'error'
            )
          }
          else {
            that.stampService.activateCode(that.secretCode)
            .then(function(result) {
              if (result) {
                Swal.fire(
                  'Code activated!',
                  `This code is activated successfully`,
                  'success'
                )
              }
              
            })
          }
        })
      }
    })
  }

}
