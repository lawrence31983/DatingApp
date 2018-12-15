import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registeredMode = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  RegisterToggle() {
    this.registeredMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registeredMode = registerMode;
  }
}
