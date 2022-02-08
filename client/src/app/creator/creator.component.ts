import { Component, OnInit } from '@angular/core';
import Moralis from 'moralis';
import { BookService } from '../services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StampService } from '../services/stamp/stamp.service';
const { soliditySha3 } = require("web3-utils");
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
  loaded;
  books = [];
  balance;
  bookInfo = {
    code: '',
    serialNumber: '',
    name: '',
    qrCode: '',
  };
  currentAccount;

  constructor(private router: Router,
              private bookService: BookService,
              private stampService: StampService) { }

  ngOnInit(): void {
    this.currentAccount = Moralis.User.current().get('ethAddress');
    let that = this;
    this.bookService.getAllBook()
    .subscribe(data => {
      this.books = data as any;
    })
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

  createStamp() {
    let that = this;
    this.stampService.createStamp(this.bookInfo.code, this.bookInfo.serialNumber, this.currentAccount)
    .then(function(result) {
      let transactionHash = (result as any).transactionHash;
      let data = {
        code: soliditySha3(that.bookInfo.code).substring(0, 42),
        serialNumber: soliditySha3(that.bookInfo.serialNumber).substring(0, 42),
        name: that.bookInfo.name,
        transaction: "https://chart.googleapis.com/chart?cht=qr&chld=H|1&chs=400x400&chl=https://rinkeby.etherscan.io/tx/" + (result as any).transactionHash
      }
      that.bookService.createBook(data)
      .subscribe(result => {
        if (result) {
          Swal.fire(
            'Book stamp added successfully!',
            `Transaction: ${transactionHash}`,
            'success'
          )
          .then(result => {
            window.location.reload();
          })
        }
      })
    })
  }

}