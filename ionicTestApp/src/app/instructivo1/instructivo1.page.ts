import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-instructivo1',
  templateUrl: './instructivo1.page.html',
  styleUrls: ['./instructivo1.page.scss'],
})
export class Instructivo1Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  next1(){
    this.router.navigate(['/instructivo2']);
  }
  skip(){
    this.router.navigate(['/register']);
  }
}
