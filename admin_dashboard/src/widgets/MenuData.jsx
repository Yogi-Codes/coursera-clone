const MyMenu = [
  {
    id: 1,
    title: "Dashboard",
    uri: "/",
    icon: "menu-icon las la-home",
    isMulti: false,
  },
  {
    id: 2,
    title: "Course Category",
    uri: "/courses/category",
    icon: "menu-icon las la-list",
    isMulti: false,
  },
  {
    id: 3,
    title: "Manage Course",
    uri: "/courses/new",
    icon: "menu-icon las la-video",
    isMulti: true,
    children: [
      {
        title: "Add New",
        uri: "/courses/new",
        icon: "menu-icon las la-list",
      },
      {
        title: "All Courses",
        uri: "/courses/all",
        icon: "menu-icon las la-list",
      },
      {
        title: "Trashed Courses",
        uri: "/courses/trashed",
        icon: "menu-icon las la-list",
      },
    ],
  },
  {
    id: 4,
    title: "Manage Students",
    uri: "/courses/new",
    icon: "menu-icon las la-users",
    isMulti: true,
    children: [
      {
        title: "Add New",
        uri: "/students/new",
        icon: "menu-icon las la-list",
      },
      {
        title: "All Students",
        uri: "/students/all",
        icon: "menu-icon las la-list",
      },
      {
        title: "Blocked Students",
        uri: "/students/trashed",
        icon: "menu-icon las la-list",
      },
    ],
  },
    {
      id: 5,
      title: "Manage Employee",
      uri: "/courses/new",
      icon: "menu-icon las la-users",
      isMulti: true,
      children: [
        {
          title: "Add New",
          uri: "/users/new",
          icon: "menu-icon las la-list",
        },
        {
          title: "All Employees",
          uri: "/users/all",
          icon: "menu-icon las la-list",
        },
        {
          title: "Blocked Employees",
          uri: "/users/trashed",
          icon: "menu-icon las la-list",
        },
      ],
    },
    {
      id: 6,
      title: "Manage Contacts",
      uri: "/contacts",
      icon: "menu-icon las la-envelope",
      isMulti: true,
      children: [
        {
          title: "Contacts",
          uri: "/contacts",
          icon: "menu-icon las la-list",
        },
        {
          title: "Trashed Contacts",
          uri: "/contacts/trashed",
          icon: "menu-icon las la-list",
        },
      ],
    },
    {
      id: 7,
      title: "General Settings",
      uri: "/settings/general",
      icon: "menu-icon las la-cogs",
      isMulti: false,
    },
    {
      id: 8,
      title: "Gateway Settings",
      uri: "/settings/gateway",
      icon: "menu-icon las la-credit-card",
      isMulti: false,
    },
  {
    id: 9,
    title: "Manage Quiz",
    uri: "/courses/new",
    icon: "menu-icon las la-users",
    isMulti: true,
    children: [
      {
        title: "Add New",
        uri: "/exam/new",
        icon: "menu-icon las la-list",
      },
      {
        title: "All Quiz",
        uri: "/exams/all",
        icon: "menu-icon las la-list",
      },
    ],
  },
];

export default MyMenu;
