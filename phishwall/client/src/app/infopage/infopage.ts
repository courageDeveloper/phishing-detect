import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'infopage',
    templateUrl: './infopage.html',
    styleUrls: ['./infopage.css']
})
export class InfopageComponent implements OnInit {
    notes: string[] = [];

    constructor() { }

    ngOnInit(): void {
        
    }

   
}
