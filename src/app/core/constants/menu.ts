import '@angular/localize/init';
import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: '',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: $localize`:Dashboard|Menu Label: داشبورد`,
          route: '/dashboard',
          children: [{ label: $localize`:Dashboard Overview|Menu Label: در یک نگاه`, route: '/dashboard/view' }],
        },
      ],
    },
    {
      group: '',
      separator: true,
      items: [
        {
          icon: 'assets/icons/material-icons/outline/info.svg',
          label: $localize`:Basic Information|Menu Label: اطلاعات اولیه`,
          route: '/financial',
          children: [
            { label: $localize`:Currencies|Menu Label: ارزها`, route: '/financial/currency' },
            { label: $localize`:Banks|Menu Label: بانکها`, route: '/geographical/bank' },
            { label: $localize`:Countries|Menu Label: کشورها`, route: '/geographical/country' },
            { label: $localize`:Document Types|Menu Label: انواع مدارک`, route: '/resource/document-type' },
            {
              label: $localize`:Admin Bank Accounts|Menu Label: ثبت شماره حسابهای ادمین`,
              route: '/financial/bank-account',
            },
            { label: $localize`:Panel Renewal|Menu Label: تمدید پنل`, route: '/admin/panel-revival' },
          ],
        },
        {
          icon: 'assets/icons/material-icons/outline/exchange.svg',
          label: $localize`:Exchange Offices|Menu Label: صرافی ها`,
          route: '/resource/exchange-office',
        },
        {
          icon: 'assets/icons/material-icons/outline/module.svg',
          label: $localize`:Modules|Menu Label: ماژول ها`,
          route: '/admin/module',
        },
      ],
    },
    {
      group: '',
      separator: true,
      items: [
        {
          icon: 'assets/icons/material-icons/outline/clipboard.svg',
          label: $localize`:Reports|Menu Label: گزارش ها`,
          route: '/report',
        },
        {
          icon: 'assets/icons/font-awesome/outline/comment.svg',
          label: $localize`:Customer Relations|Menu Label: ارتباط با مشتری`,
          route: '/contact/customer',
        },
      ],
    },
  ];
}
