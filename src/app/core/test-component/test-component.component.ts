import { Component, makeStateKey, OnInit, StateKey, TransferState } from '@angular/core';
import { PlatformService } from '../services/platform.service';
import { CountryApiService } from 'src/app/shared/apis/country-api.service';
import { HttpParams } from '@angular/common/http';
import { ExchangeApiService } from 'src/app/shared/apis/exchange-api.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  standalone: true,
  styleUrls: ['./test-component.component.css'],
})
export class TestComponentComponent implements OnInit {
  key = makeStateKey<any>('country');
  constructor(private pt: PlatformService, private transferState: TransferState, private ex: ExchangeApiService) {}

  ngOnInit() {
    if (this.pt.isServer) {
      this.ex.getAll('6771a06db3326fd60359a655', new HttpParams()).subscribe((response) => {
        this.transferState.set(this.key, response);
        console.log(response);
      });
    }
    if (this.pt.isBrowser) {
      console.log('test browser');
      console.log(document.cookie);
    }
  }
  getData() {
    return JSON.stringify(this.transferState.get(this.key, null));
  }
}
