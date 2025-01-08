import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'داشبورد',
      separator: false,
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
        {
          icon: 'assets/icons/material-icons/outline/person.svg',
          label: 'کارمند ها',
          route: '/resource/employee',
        },
      ],
    },
    {
      group: 'ارزی',
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
              route: '/resource/currency',
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
          label: 'پنل ها',
          route: '/admin/panel',
        },
        {
          label: 'ثبت شماره حسابهای ادمین',
          route: '/financial/bank-account',
        },
      ],
    },
    // {
    //   group: 'Collaboration',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/download.svg',
    //       label: 'Download',
    //       route: '/download',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/gift.svg',
    //       label: 'Gift Card',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/users.svg',
    //       label: 'Users',
    //       route: '/users',
    //     },
    //   ],
    // },
    // {
    //   group: 'Config',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/lock-closed.svg',
    //       label: 'Auth',
    //       route: '/auth',
    //       children: [
    //         { label: 'Sign up', route: '/auth/sign-up' },
    //         { label: 'Sign in', route: '/auth/sign-in' },
    //         { label: 'Forgot Password', route: '/auth/forgot-password' },
    //         { label: 'New Password', route: '/auth/new-password' },
    //         { label: 'Two Steps', route: '/auth/two-steps' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
    //       label: 'Errors',
    //       route: '/errors',
    //       children: [
    //         { label: '404', route: '/errors/404' },
    //         { label: '500', route: '/errors/500' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/cube.svg',
    //       label: 'Components',
    //       route: '/components',
    //       children: [{ label: 'Table', route: '/components/table' }],
    //     },
    //   ],
    // },
    // {
    //   group: 'Config',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/cog.svg',
    //       label: 'Settings',
    //       route: '/settings',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/bell.svg',
    //       label: 'Notifications',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/folder.svg',
    //       label: 'Folders',
    //       route: '/folders',
    //       children: [
    //         { label: 'Current Files', route: '/folders/current-files' },
    //         { label: 'Downloads', route: '/folders/download' },
    //         { label: 'Trash', route: '/folders/trash' },
    //       ],
    //     },
    //   ],
    // },
  ];
}
