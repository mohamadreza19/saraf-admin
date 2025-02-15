import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'داشبورد',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'داشبورد',
          route: '/dashboard',
          children: [
            { label: 'در یک نگاه', route: '/dashboard/view' },

            // { label: 'Podcast', route: '/dashboard/podcast' },
          ],
        },
        // {
        //   icon: 'assets/icons/material-icons/outline/person.svg',
        //   label: 'کارمند ها',
        //   route: '/resource/employee',
        // },
      ],
    },
    {
      group: 'اطلاعات اولیه',
      separator: true,
      items: [
        {
          icon: 'assets/icons/material-icons/outline/mony.svg',
          label: 'مالی',
          route: '/financial',
          children: [
            {
              label: 'صرافی ها',
              route: '/resource/exchange-office',
            },
            {
              label: 'ارزها',
              route: '/financial/currency',
            },
          ], // { label: 'Podcast', route: '/dashboard/podcast' },],
        },
        {
          icon: 'assets/icons/circum-icons/outline/bank.svg',
          label: 'کشورها و بانک‌ها',
          route: '/geographical',
          children: [
            {
              label: 'بانکها',
              route: '/geographical/bank',
            },
            {
              label: 'کشورها',
              route: '/geographical/country',
            },
          ], // { label: 'Podcast', route: '/dashboard/podcast' },],
        },
      ],
    },
    {
      group: 'گزارش و ارتباط با مشتری',
      separator: true,
      items: [
        {
          icon: 'assets/icons/material-icons/outline/clipboard.svg',
          label: 'گزارش ها',
          route: '/report',
        },
        {
          icon: 'assets/icons/font-awesome/outline/comment.svg',
          label: 'ارتباط با مشتری',
          route: '/contact/customer',
        },
      ],
    },
    {
      group: 'پنل و ادمین',
      separator: true,

      items: [
        {
          label: 'ماژول ها',
          route: '/admin/panel',
        },
        // {
        //   label: 'ماژول ها',
        //   route: '/admin/module',
        // },
        {
          label: 'ثبت شماره حسابهای ادمین',
          route: '/financial/bank-account',
        },
        {
          label: 'انواع مدارک',
          route: '/resource/document-type',
        },
      ],
    },
  ];
}
