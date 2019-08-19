import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToList() {
    this.router.navigate(['list']);
  }

}
