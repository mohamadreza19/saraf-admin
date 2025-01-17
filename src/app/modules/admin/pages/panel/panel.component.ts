import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ExchangeTableComponent } from '../../../dashboard/components/view/exchange-table/exchange-table.component';
import { HeaderButtonsComponent } from '../../../financial/components/header-buttons/header-buttons.component';
import { Panel } from 'src/app/shared/models/panel.interface';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/tables/table/table.component';
import { TableConfig } from 'src/app/shared/models/table-config';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ExchangeTableComponent, HeaderButtonsComponent, TableComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent implements AfterViewInit {
  tableConfig!: TableConfig;
  @ViewChild('activeBtn') activeBtn!: TemplateRef<any>;
  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    this.tableConfig = {
      title: 'قیمت ماژول ها',
      tableHeader: ['سال', 'خریدار', 'ماژول', 'واحد پولی', 'قیمت ماهیانه', 'توضیح', 'زبان', 'وضعیت'],
      tableBody: [
        {
          year: '2021',
          buyer: 'John Doe',
          module: 'Module A',
          currency: 'USD',
          monthlyPrice: '100',
          description: 'Description A',
          language: 'En',
        },
        {
          year: '2022',
          buyer: 'Jane Smith',
          module: 'Module B',
          currency: 'EUR',
          monthlyPrice: '150',
          description: 'Description B',
          language: 'En',
        },
        {
          year: '2023',
          buyer: 'Alice Johnson',
          module: 'Module C',
          currency: 'GBP',
          monthlyPrice: '200',
          description: 'Description C',
          language: 'En',
        },
      ],
      actions: [
        {
          templateRef: this.activeBtn,
        },
        {
          label: 'ویرایش',
          styleProps: {
            tone: 'warning',
          },
          callback(row) {},
        },
      ],
    };
  }

  primaryNavigate() {
    this.router.navigate(['/admin/panel/add']);
  }
  lightNavigate() {
    this.router.navigate(['/dashboard']);
  }
}
