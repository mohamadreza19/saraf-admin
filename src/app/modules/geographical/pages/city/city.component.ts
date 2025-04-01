import { Component, inject, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { paginationFactory } from './pagination.factory';
import { CityResponse } from 'src/app/shared/apis/city-api.service';
import { TableConfig } from 'src/app/shared/models/table-config';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  standalone: true,
  styleUrls: ['./city.component.css'],

  providers: [
    {
      provide: PaginationService,
      useFactory: paginationFactory,
    },
  ],
  imports: [HeaderButtonsComponent, CommonModule, TableComponent],
})
export class CityComponent implements OnInit {
  tableConfig!: TableConfig;
  route = inject(ActivatedRoute);

  constructor(public pg: PaginationService<CityResponse>, private router: Router) {
    this.tableConfig = {
      title: $localize`شهر ها`,
      tableHeader: [$localize`نام`],
      tableBody: [],
      actions: [],
    };
  }

  ngOnInit() {
    const qp = this.route.snapshot.queryParams;
    if ('countryId' in qp && 'countryTitle' in qp) {
      const { countryId, countryTitle } = qp;
      this.pg.initPagination(countryId);
      this.tableConfig.title = $localize`لیست شهر های ${countryTitle}`;
    }
  }

  navAdd() {
    const qp = this.route.snapshot.queryParams;
    if ('countryId' in qp && 'countryTitle' in qp) {
      const { countryId, countryTitle } = qp;

      this.router.navigate(['geographical/city/mutate'], {
        queryParams: { httpMethod: 'post', countryId, countryTitle },
      });
    }
  }

  navEdit(index: number) {}

  navDash() {
    this.router.navigate(['dashboard']);
  }
}
