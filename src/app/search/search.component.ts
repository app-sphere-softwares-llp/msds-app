import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() isMobile: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goToList() {
    this.router.navigate(['list']);
  }

}
