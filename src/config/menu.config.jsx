// import { RiCurrencyFill, RiStore2Line } from "@remixicon/react";
import {
  RiStore2Line,
  RiCurrencyFill,
  RiPriceTag2Fill,
  RiPriceTag2Line,
  RiCommunityFill,
  RiCommunityLine,
  RiLoopLeftLine,
} from "@remixicon/react";
import {
  AlertCircle,
  ArrowUpNarrowWideIcon,
  Award,
  Badge,
  Bell,
  Bitcoin,
  Bolt,
  Book,
  BookCopy,
  Briefcase,
  Building,
  CalendarCheck,
  Captions,
  ChartNoAxesCombined,
  CheckCircle,
  Code,
  Codepen,
  Coffee,
  CurrencyIcon,
  File as DocumentIcon,
  Euro,
  Eye,
  File,
  FileQuestion,
  FileText,
  Flag,
  Gem,
  Ghost,
  Gift,
  Grid,
  Heart,
  HelpCircle,
  Kanban,
  Key,
  Layout,
  LayoutDashboard,
  LayoutGrid,
  LifeBuoy,
  LineChart,
  ListChecks,
  MessageSquare,
  MessagesSquare,
  Monitor,
  Network,
  Users as PeopleIcon,
  PieChart,
  Plug,
  ScrollText,
  Settings,
  Share2,
  Shield,
  ShieldUser,
  ShoppingCart,
  SquareMousePointer,
  Star,
  Store,
  Theater,
  TrendingUp,
  UserCheck,
  UserCircle,
  UserRoundCogIcon,
  Users,
  Briefcase as WorkIcon,
  Wrench,
  Zap,
} from "lucide-react";

export const MENU_SIDEBAR = [
  // {
  //   title: "Dashboard",
  //   icon: LayoutGrid,
  //   children: [
  //     { title: "Overview", path: "/" },
  //     { title: "Sales Trends & Graphs", path: "/dark-sidebar" },
  //     { title: "Store Setup Progress Tracker", path: "/alert" },
  //     { title: "Recent Orders Summary", path: "/alert" },
  //   ],
  // },
  // { heading: "User" },
  {
    title: "Product Management",
    icon: RiStore2Line,
    children: [
      {
        title: "My Products",
        children: [
          {
            title: "Product List",
            path: "/dashboard/product-management/my-products",
          },
          {
            title: "Edit Product Info",
            path: "/dashboard/store-detail-view/assign-products",
          },
          {
            title: "Product Detail View",
            path: "/dashboard/product-management/category",
          },
        ],
      },
      {
        title: "Browse Other Products",
        path: "/dashboard/product-management/browse-products",
      },
      {
        title: "Manage Collection",
        path: "/dashboard/product-management/manage-collection",
      },
      // { title: "Product History & Logs", path: "/public-profile/works" },
    ],
  },
  {
    title: "Customer Data",
    icon: Users,
    children: [
      {
        title: "All Customers",
        path: "/dashboard/customer-data",
      },
    ],
  },
  {
    title: "Pricing & Margins",
    icon: RiPriceTag2Line,
    children: [
      {
        title: "Apply Margin",
        children: [
          {
            title: "By Category",
            path: "/dashboard/pricing-margin/by-category",
          },
          {
            title: "By Individual Products",
            path: "/dashboard/pricing-margin/by-individual",
          },
        ],
      },
      // { title: "Real-Time Price Preview", path: "/account/notifications" },
      // { title: "Margin Rules & Limits", path: "/account/api-keys" },
    ],
  },
  {
    title: "Order Management",
    icon: ListChecks,
    children: [
      { title: "All Orders", path: "/dashboard/order-management/all" },
      // { title: "Fulfilled Orders", path: "/order-management/fulfilled" },
      // { title: "In Transit Orders", path: "/order-management/in-transit" },
      {
        title: "Return/ Repair Orders",
        path: "/dashboard/order-management/return-repair",
      },
      // { title: "Manual Order Entry", path: "/order-management/manual" },
      // { title: "Invoices & Receipts", path: "/order-management/invoices" },
    ],
  },
  {
    title: "Custom Jewelry",
    icon: ArrowUpNarrowWideIcon,
    children: [
      {
        title: "All Custom Requests",
        path: "/dashboard/custom-jewelary/all-custom-request",
      },
      // {
      //   title: "Request Details View",
      //   path: "/custom-jewelary",
      // },
      // {
      //   title: "Quotation and CAD File",
      //   path: "/pricing-margin/pricing-tier-rule",
      // },
      // { title: "Communication", path: "/pricing-margin/store-lists" },
    ],
  },
  // {
  //   title: "Content & Branding",
  //   icon: ArrowUpNarrowWideIcon,
  //   children: [
  //     { title: "Store Branding", path: "/custom-request" },
  //     { title: "Request Website Content", path: "/custom-requests-details" },
  //   ],
  // },
  {
    title: "Coupons Management",
    icon: Settings,
    children: [
      { title: "Coupons", path: "/dashboard/coupons-management" },
      // { title: "Notifications", path: "/social/accounts" },
      // { title: "Jewel Label Announcements", path: "/social/performance" },
    ],
  },
  {
    title: "CMS",
    icon: Settings,
    children: [{ title: "Elova CMS", path: "/dashboard/cms" }],
  },
  // {
  //   title: "Communication & Support",
  //   path: "/dashboard/coupons-management",
  //   icon: LifeBuoy,
  // },
  {
    title: "Communication",
    icon: Settings,
    children: [{ title: "Communication", path: "/dashboard/support" }],
  },
  {
    title: "Billing & Finance",
    icon: ChartNoAxesCombined,
    children: [{ title: "Store Invoices", path: "/dashboard/billing-finance" }],
  },
  {
    title: "Users & Roles",
    icon: RiLoopLeftLine,
    children: [
      { title: "All Users List", path: "/dashboard/users-roles" },
      { title: "Roles & Access", path: "/social/accounts" },
    ],
  },
  {
    title: "Tools & Help",
    icon: BookCopy,
    children: [{ title: "Knowledge Base", path: "/dashboard/help-center" }],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [{ title: "Store Settings", path: "/dashboard/settings" }],
  },
  // {
  //   title: "Customers & Com",
  //   icon: PieChart,
  //   children: [
  //     { title: "Internal Support Tickets", path: "/support" },
  //     // { title: "Notifications", path: "/social/accounts" },
  //     // { title: "Jewel Label Announcements", path: "/social/performance" },
  //   ],
  // },
  // {
  //   title: "Reports & Analytics",
  //   icon: ChartNoAxesCombined,
  //   children: [
  //     { title: "Sales Reports", path: "/users/super-admins" },
  //     {
  //       title: "Product Performance Metrics",
  //       path: "/users/roles-permissions",
  //     },
  //     { title: "Revenue Breakdown", path: "/users/activity-logs" },
  //     { title: "Low Performing Products", path: "/users/access-audit" },
  //   ],
  // },
  // {
  //   title: "Settings & Permissions",
  //   icon: Settings,
  //   children: [
  //     { title: "Store Profile", path: "/support/tickets" },
  //     { title: "Team Member Management", path: "/support/communication-log" },
  //     { title: "Custom Domain Settings", path: "/support/notifications" },
  //     { title: "Store Preferences", path: "/support/announcements" },
  //   ],
  // },
  // {
  //   title: "Support & Help",
  //   icon: HelpCircle,
  //   children: [
  //     { title: "Support Ticket", path: "/support/tickets" },
  //     { title: "Live Chat Support", path: "/support/communication-log" },
  //     {
  //       title: "Help Center / Documentation",
  //       path: "/support/communication-log",
  //     },
  //     { title: "Tutorial Videos", path: "/support/communication-log" },
  //   ],
  // },
];

export const MENU_SIDEBAR_CUSTOM = [
  {
    title: "Store - Client",
    icon: Users,
    children: [
      { title: "Home", path: "/store-client/home" },
      {
        title: "Search Results",
        children: [
          {
            title: "Search Results - Grid",
            path: "/store-client/search-results-grid",
          },
          {
            title: "Search Results - List",
            path: "/store-client/search-results-list",
          },
        ],
      },
      {
        title: "Overlays",
        children: [
          { title: "Product Details", path: "/store-client/product-details" },
          { title: "Wishlist", path: "/store-client/wishlist" },
        ],
      },
      {
        title: "Checkout",
        children: [
          {
            title: "Order Summary",
            path: "/store-client/checkout/order-summary",
          },
          {
            title: "Shipping Info",
            path: "/store-client/checkout/shipping-info",
          },
          {
            title: "Payment Method",
            path: "/store-client/checkout/payment-method",
          },
          {
            title: "Order Placed",
            path: "/store-client/checkout/order-placed",
          },
        ],
      },
      { title: "My Orders", path: "/store-client/my-orders" },
      { title: "Order Receipt", path: "/store-client/order-receipt" },
    ],
  },
];

export const MENU_SIDEBAR_COMPACT = [
  {
    title: "Dashboards",
    icon: LayoutGrid,
    path: "/",
  },
  {
    title: "Public Profile",
    icon: UserCircle,
    children: [
      {
        title: "Profiles",
        children: [
          { title: "Default", path: "/public-profile/profiles/default" },
          { title: "Creator", path: "/public-profile/profiles/creator" },
          { title: "Company", path: "/public-profile/profiles/company" },
          { title: "NFT", path: "/public-profile/profiles/nft" },
          { title: "Blogger", path: "/public-profile/profiles/blogger" },
          { title: "CRM", path: "/public-profile/profiles/crm" },
          {
            title: "More",
            collapse: true,
            collapseTitle: "Show less",
            expandTitle: "Show 4 more",
            children: [
              { title: "Gamer", path: "/public-profile/profiles/gamer" },
              { title: "Feeds", path: "/public-profile/profiles/feeds" },
              { title: "Plain", path: "/public-profile/profiles/plain" },
              { title: "Modal", path: "/public-profile/profiles/modal" },
            ],
          },
        ],
      },
      {
        title: "Projects",
        // children: [
        //   { title: "3 Columns", path: "/public-profile/projects/3-columns" },
        //   { title: "2 Columns", path: "/public-profile/projects/2-columns" },
        // ],
      },
      { title: "Works", path: "/public-profile/works" },
      { title: "Teams", path: "/public-profile/teams" },
      { title: "Network", path: "/public-profile/network" },
      { title: "Activity", path: "/public-profile/activity" },
      {
        title: "More",
        collapse: true,
        collapseTitle: "Show less",
        expandTitle: "Show 3 more",
        children: [
          { title: "Campaigns - Card", path: "/public-profile/campaigns/card" },
          { title: "Campaigns - List", path: "/public-profile/campaigns/list" },
          { title: "Empty", path: "/public-profile/empty" },
        ],
      },
    ],
  },
  {
    title: "My Account",
    icon: Settings,
    children: [
      {
        title: "Account",
        children: [
          { title: "Get Started", path: "/account/home/get-started" },
          { title: "User Profile", path: "/account/home/user-profile" },
          { title: "Company Profile", path: "/account/home/company-profile" },
          {
            title: "Settings - With Sidebar",
            path: "/account/home/settings-sidebar",
          },
          {
            title: "Settings - Enterprise",
            path: "/account/home/settings-enterprise",
          },
          { title: "Settings - Plain", path: "/account/home/settings-plain" },
          { title: "Settings - Modal", path: "/account/home/settings-modal" },
        ],
      },
      {
        title: "Billing",
        children: [
          { title: "Billing - Basic", path: "/account/billing/basic" },
          {
            title: "Billing - Enterprise",
            path: "/account/billing/enterprise",
          },
          { title: "Plans", path: "/account/billing/plans" },
          { title: "Billing History", path: "/account/billing/history" },
        ],
      },
      {
        title: "Security",
        children: [
          { title: "Get Started", path: "/account/security/get-started" },
          { title: "Security Overview", path: "/account/security/overview" },
          {
            title: "Allowed IP Addresses",
            path: "/account/security/allowed-ip-addresses",
          },
          {
            title: "Privacy Settings",
            path: "/account/security/privacy-settings",
          },
          {
            title: "Device Management",
            path: "/account/security/device-management",
          },
          {
            title: "Backup & Recovery",
            path: "/account/security/backup-and-recovery",
          },
          {
            title: "Current Sessions",
            path: "/account/security/current-sessions",
          },
          { title: "Security Log", path: "/account/security/security-log" },
        ],
      },
      {
        title: "Members & Roles",
        children: [
          { title: "Teams Starter", path: "/account/members/team-starter" },
          { title: "Teams", path: "/account/members/teams" },
          { title: "Team Info", path: "/account/members/team-info" },
          {
            title: "Members Starter",
            path: "/account/members/members-starter",
          },
          { title: "Team Members", path: "/account/members/team-members" },
          { title: "Import Members", path: "/account/members/import-members" },
          { title: "Roles", path: "/account/members/roles" },
          {
            title: "Permissions - Toggler",
            path: "/account/members/permissions-toggle",
          },
          {
            title: "Permissions - Check",
            path: "/account/members/permissions-check",
          },
        ],
      },
      { title: "Integrations", path: "/account/integrations" },
      { title: "Notifications", path: "/account/notifications" },
      { title: "API Keys", path: "/account/api-keys" },
      {
        title: "More",
        collapse: true,
        collapseTitle: "Show less",
        expandTitle: "Show 3 more",
        children: [
          { title: "Appearance", path: "/account/appearance" },
          { title: "Invite a Friend", path: "/account/invite-a-friend" },
          { title: "Activity", path: "/account/activity" },
        ],
      },
    ],
  },
  {
    title: "Network",
    icon: Users,
    children: [
      { title: "Get Started", path: "/network/get-started" },
      {
        title: "User Cards",
        children: [
          { title: "Mini Cards", path: "/network/user-cards/mini-cards" },
          { title: "Team Crew", path: "/network/user-cards/team-crew" },
          { title: "Author", path: "/network/user-cards/author" },
          { title: "NFT", path: "/network/user-cards/nft" },
          { title: "Social", path: "/network/user-cards/social" },
        ],
      },
      {
        title: "User Table",
        children: [
          { title: "Team Crew", path: "/network/user-table/team-crew" },
          { title: "App Roster", path: "/network/user-table/app-roster" },
          {
            title: "Market Authors",
            path: "/network/user-table/market-authors",
          },
          { title: "SaaS Users", path: "/network/user-table/saas-users" },
          { title: "Store Clients", path: "/network/user-table/store-clients" },
          { title: "Visitors", path: "/network/user-table/visitors" },
        ],
      },
      { title: "Cooperations", path: "/network/cooperations", disabled: true },
      { title: "Leads", path: "/network/leads", disabled: true },
      { title: "Donators", path: "/network/donators", disabled: true },
    ],
  },
  {
    title: "Store - Client",
    icon: ShoppingCart,
    children: [
      { title: "Home", path: "/store-client/home" },
      {
        title: "Search Results - Grid",
        path: "/store-client/search-results-grid",
      },
      {
        title: "Search Results - List",
        path: "/store-client/search-results-list",
      },
      { title: "Product Details", path: "/store-client/product-details" },
      { title: "Wishlist", path: "/store-client/wishlist" },
      {
        title: "Checkout",
        children: [
          {
            title: "Order Summary",
            path: "/store-client/checkout/order-summary",
          },
          {
            title: "Shipping Info",
            path: "/store-client/checkout/shipping-info",
          },
          {
            title: "Payment Method",
            path: "/store-client/checkout/payment-method",
          },
          {
            title: "Order Placed",
            path: "/store-client/checkout/order-placed",
          },
        ],
      },
      { title: "My Orders", path: "/store-client/my-orders" },
      { title: "Order Receipt", path: "/store-client/order-receipt" },
    ],
  },
  {
    title: "User Management",
    icon: ShieldUser,
    children: [
      {
        title: "Users",
        path: "/user-management/users",
      },
      {
        title: "Roles",
        path: "/user-management/roles",
      },
      {
        title: "Permissions",
        path: "/user-management/permissions",
      },
      {
        title: "Account",
        path: "/user-management/account",
      },
      {
        title: "Logs",
        path: "/user-management/logs",
      },
      {
        title: "Settings",
        path: "/user-management/settings",
      },
    ],
  },
  {
    title: "Authentication",
    icon: Shield,
    children: [
      {
        title: "Sign In",
        path: "/signin",
      },
      {
        title: "Check Email",
        path: "/signup",
      },
      {
        title: "Reset Password",
        path: "/reset-password",
      },
      {
        title: "2FA",
        path: "/2fa",
      },
      { title: "Welcome Message", path: "/auth/welcome-message" },
      { title: "Account Deactivated", path: "/auth/account-deactivated" },
      { title: "Error 404", path: "/error/404" },
      { title: "Error 500", path: "/error/500" },
    ],
  },
];

export const MENU_MEGA = [
  { title: "Home", path: "/" },
  {
    title: "Profiles",
    children: [
      {
        title: "Profiles",
        children: [
          {
            children: [
              {
                title: "Default",
                icon: Badge,
                path: "/public-profile/profiles/default",
              },
              {
                title: "Creator",
                icon: Coffee,
                path: "/public-profile/profiles/creator",
              },
              {
                title: "Company",
                icon: Building,
                path: "/public-profile/profiles/company",
              },
              {
                title: "NFT",
                icon: Bitcoin,
                path: "/public-profile/profiles/nft",
              },
              {
                title: "Blogger",
                icon: MessageSquare,
                path: "/public-profile/profiles/blogger",
              },
              {
                title: "CRM",
                icon: Monitor,
                path: "/public-profile/profiles/crm",
              },
              {
                title: "Gamer",
                icon: Ghost,
                path: "/public-profile/profiles/gamer",
              },
            ],
          },
          {
            children: [
              {
                title: "Feeds",
                icon: Book,
                path: "/public-profile/profiles/feeds",
              },
              {
                title: "Plain",
                icon: File,
                path: "/public-profile/profiles/plain",
              },
              {
                title: "Modal",
                icon: SquareMousePointer,
                path: "/public-profile/profiles/modal",
              },
              {
                title: "Freelancer",
                icon: Briefcase,
                path: "#",
                disabled: true,
              },
              { title: "Developer", icon: Code, path: "#", disabled: true },
              { title: "Team", icon: Users, path: "#", disabled: true },
              {
                title: "Events",
                icon: CalendarCheck,
                path: "#",
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        title: "Other Pages",
        children: [
          {
            children: [
              {
                title: "Projects - 3 Cols",
                icon: Layout,
                path: "/public-profile/projects/3-columns",
              },
              {
                title: "Projects - 2 Cols",
                icon: Grid,
                path: "/public-profile/projects/2-columns",
              },
              { title: "Works", icon: WorkIcon, path: "/public-profile/works" },
              {
                title: "Teams",
                icon: PeopleIcon,
                path: "/public-profile/teams",
              },
              {
                title: "Network",
                icon: Network,
                path: "/public-profile/network",
              },
              {
                title: "Activity",
                icon: TrendingUp,
                path: "/public-profile/activity",
              },
              {
                title: "Campaigns - Card",
                icon: LayoutGrid,
                path: "/public-profile/campaigns/card",
              },
            ],
          },
          {
            children: [
              {
                title: "Campaigns - List",
                icon: Kanban,
                path: "/public-profile/campaigns/list",
              },
              { title: "Empty", icon: FileText, path: "/public-profile/empty" },
              {
                title: "Documents",
                icon: DocumentIcon,
                path: "#",
                disabled: true,
              },
              { title: "Badges", icon: Award, path: "#", disabled: true },
              { title: "Awards", icon: Gift, path: "#", disabled: true },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "My Account",
    children: [
      {
        title: "General Pages",
        children: [
          { title: "Integrations", icon: Plug, path: "/account/integrations" },
          {
            title: "Notifications",
            icon: Bell,
            path: "/account/notifications",
          },
          { title: "API Keys", icon: Key, path: "/account/api-keys" },
          { title: "Appearance", icon: Eye, path: "/account/appearance" },
          {
            title: "Invite a Friend",
            icon: UserCheck,
            path: "/account/invite-a-friend",
          },
          { title: "Activity", icon: LifeBuoy, path: "/account/activity" },
          { title: "Brand", icon: CheckCircle, disabled: true },
          { title: "Get Paid", icon: Euro, disabled: true },
        ],
      },
      {
        title: "Other pages",
        children: [
          {
            title: "Account Home",
            children: [
              { title: "Get Started", path: "/account/home/get-started" },
              { title: "User Profile", path: "/account/home/user-profile" },
              {
                title: "Company Profile",
                path: "/account/home/company-profile",
              },
              { title: "With Sidebar", path: "/account/home/settings-sidebar" },
              {
                title: "Enterprise",
                path: "/account/home/settings-enterprise",
              },
              { title: "Plain", path: "/account/home/settings-plain" },
              { title: "Modal", path: "/account/home/settings-modal" },
            ],
          },
          {
            title: "Billing",
            children: [
              { title: "Basic Billing", path: "/account/billing/basic" },
              { title: "Enterprise", path: "/account/billing/enterprise" },
              { title: "Plans", path: "/account/billing/plans" },
              { title: "Billing History", path: "/account/billing/history" },
              { title: "Tax Info", disabled: true },
              { title: "Invoices", disabled: true },
              { title: "Gateaways", disabled: true },
            ],
          },
          {
            title: "Security",
            children: [
              { title: "Get Started", path: "/account/security/get-started" },
              {
                title: "Security Overview",
                path: "/account/security/overview",
              },
              {
                title: "IP Addresses",
                path: "/account/security/allowed-ip-addresses",
              },
              {
                title: "Privacy Settings",
                path: "/account/security/privacy-settings",
              },
              {
                title: "Device Management",
                path: "/account/security/device-management",
              },
              {
                title: "Backup & Recovery",
                path: "/account/security/backup-and-recovery",
              },
              {
                title: "Current Sessions",
                path: "/account/security/current-sessions",
              },
              { title: "Security Log", path: "/account/security/security-log" },
            ],
          },
          {
            title: "Members & Roles",
            children: [
              { title: "Teams Starter", path: "/account/members/team-starter" },
              { title: "Teams", path: "/account/members/teams" },
              { title: "Team Info", path: "/account/members/team-info" },
              {
                title: "Members Starter",
                path: "/account/members/members-starter",
              },
              { title: "Team Members", path: "/account/members/team-members" },
              {
                title: "Import Members",
                path: "/account/members/import-members",
              },
              { title: "Roles", path: "/account/members/roles" },
              {
                title: "Permissions - Toggler",
                path: "/account/members/permissions-toggle",
              },
              {
                title: "Permissions - Check",
                path: "/account/members/permissions-check",
              },
            ],
          },
          {
            title: "Other Pages",
            children: [
              { title: "Integrations", path: "/account/integrations" },
              { title: "Notifications", path: "/account/notifications" },
              { title: "API Keys", path: "/account/api-keys" },
              { title: "Appearance", path: "/account/appearance" },
              { title: "Invite a Friend", path: "/account/invite-a-friend" },
              { title: "Activity", path: "/account/activity" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Network",
    children: [
      {
        title: "General Pages",
        children: [
          { title: "Get Started", icon: Flag, path: "/network/get-started" },
          { title: "Colleagues", icon: Users, path: "#", disabled: true },
          { title: "Donators", icon: Heart, path: "#", disabled: true },
          { title: "Leads", icon: Zap, path: "#", disabled: true },
        ],
      },
      {
        title: "Other pages",
        children: [
          {
            title: "User Cards",
            children: [
              { title: "Mini Cards", path: "/network/user-cards/mini-cards" },
              { title: "Team Members", path: "/network/user-cards/team-crew" },
              { title: "Authors", path: "/network/user-cards/author" },
              { title: "NFT Users", path: "/network/user-cards/nft" },
              { title: "Social Users", path: "/network/user-cards/social" },
              { title: "Gamers", path: "#", disabled: true },
            ],
          },
          {
            title: "User Base",
            badge: "Datatables",
            children: [
              { title: "Team Crew", path: "/network/user-table/team-crew" },
              { title: "App Roster", path: "/network/user-table/app-roster" },
              {
                title: "Market Authors",
                path: "/network/user-table/market-authors",
              },
              { title: "SaaS Users", path: "/network/user-table/saas-users" },
              {
                title: "Store Clients",
                path: "/network/user-table/store-clients",
              },
              { title: "Visitors", path: "/network/user-table/visitors" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Apps",
    children: [
      {
        title: "Store - Client",
        children: [
          {
            children: [
              { title: "Home", path: "/store-client/home" },
              {
                title: "Search Results - Grid",
                path: "/store-client/search-results-grid",
              },
              {
                title: "Search Results - List",
                path: "/store-client/search-results-list",
              },
              {
                title: "Product Details",
                path: "/store-client/product-details",
              },
              { title: "Wishlist", path: "/store-client/wishlist" },
              { title: "My Orders", path: "/store-client/my-orders" },
            ],
          },
          {
            children: [
              {
                title: "Checkout - Order Summary",
                path: "/store-client/checkout/order-summary",
              },
              {
                title: "Checkout - Shipping Info",
                path: "/store-client/checkout/shipping-info",
              },
              {
                title: "Checkout - Payment Method",
                path: "/store-client/checkout/payment-method",
              },
              {
                title: "Checkout - Order Placed",
                path: "/store-client/checkout/order-placed",
              },
              { title: "Order Receipt", path: "/store-client/order-receipt" },
            ],
          },
        ],
      },
      {
        title: "User Management",
        children: [
          {
            children: [
              {
                title: "Users",
                path: "/user-management/users",
              },
              {
                title: "Roles",
                path: "/user-management/roles",
              },
              {
                title: "Permissions",
                path: "/user-management/permissions",
              },
              {
                title: "Account",
                path: "/user-management/account",
              },
              {
                title: "Logs",
                path: "/user-management/logs",
              },
              {
                title: "Settings",
                path: "/user-management/settings",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const MENU_MEGA_MOBILE = [
  { title: "Home", path: "/" },
  {
    title: "Profiles",
    children: [
      {
        title: "Profiles",
        children: [
          {
            title: "Default",
            icon: Badge,
            path: "/public-profile/profiles/default",
          },
          {
            title: "Creator",
            icon: Coffee,
            path: "/public-profile/profiles/creator",
          },
          {
            title: "Company",
            icon: Building,
            path: "/public-profile/profiles/company",
          },
          { title: "NFT", icon: Bitcoin, path: "/public-profile/profiles/nft" },
          {
            title: "Blogger",
            icon: MessageSquare,
            path: "/public-profile/profiles/blogger",
          },
          { title: "CRM", icon: Monitor, path: "/public-profile/profiles/crm" },
          {
            title: "Gamer",
            icon: Ghost,
            path: "/public-profile/profiles/gamer",
          },
          {
            title: "Feeds",
            icon: Book,
            path: "/public-profile/profiles/feeds",
          },
          {
            title: "Plain",
            icon: File,
            path: "/public-profile/profiles/plain",
          },
          {
            title: "Modal",
            icon: SquareMousePointer,
            path: "/public-profile/profiles/modal",
          },
          { title: "Freelancer", icon: Briefcase, path: "#", disabled: true },
          { title: "Developer", icon: Code, path: "#", disabled: true },
          { title: "Team", icon: Users, path: "#", disabled: true },
          { title: "Events", icon: CalendarCheck, path: "#", disabled: true },
        ],
      },
      {
        title: "Other Pages",
        children: [
          {
            title: "Projects - 3 Cols",
            icon: Layout,
            path: "/public-profile/projects/3-columns",
          },
          {
            title: "Projects - 2 Cols",
            icon: Grid,
            path: "/public-profile/projects/2-columns",
          },
          { title: "Works", icon: WorkIcon, path: "/public-profile/works" },
          { title: "Teams", icon: PeopleIcon, path: "/public-profile/teams" },
          { title: "Network", icon: Network, path: "/public-profile/network" },
          {
            title: "Activity",
            icon: TrendingUp,
            path: "/public-profile/activity",
          },
          {
            title: "Campaigns - Card",
            icon: LayoutGrid,
            path: "/public-profile/campaigns/card",
          },
          {
            title: "Campaigns - List",
            icon: Kanban,
            path: "/public-profile/campaigns/list",
          },
          { title: "Empty", icon: FileText, path: "/public-profile/empty" },
          { title: "Documents", icon: DocumentIcon, path: "#", disabled: true },
          { title: "Badges", icon: Award, path: "#", disabled: true },
          { title: "Awards", icon: Gift, path: "#", disabled: true },
        ],
      },
    ],
  },
  {
    title: "My Account",
    children: [
      {
        title: "General Pages",
        children: [
          { title: "Integrations", icon: Plug, path: "/account/integrations" },
          {
            title: "Notifications",
            icon: Bell,
            path: "/account/notifications",
          },
          { title: "API Keys", icon: Key, path: "/account/api-keys" },
          { title: "Appearance", icon: Eye, path: "/account/appearance" },
          {
            title: "Invite a Friend",
            icon: UserCheck,
            path: "/account/invite-a-friend",
          },
          { title: "Activity", icon: LifeBuoy, path: "/account/activity" },
          { title: "Brand", icon: CheckCircle, disabled: true },
          { title: "Get Paid", icon: Euro, disabled: true },
        ],
      },
      {
        title: "Other pages",
        children: [
          {
            title: "Account Home",
            children: [
              { title: "Get Started", path: "/account/home/get-started" },
              { title: "User Profile", path: "/account/home/user-profile" },
              {
                title: "Company Profile",
                path: "/account/home/company-profile",
              },
              { title: "With Sidebar", path: "/account/home/settings-sidebar" },
              {
                title: "Enterprise",
                path: "/account/home/settings-enterprise",
              },
              { title: "Plain", path: "/account/home/settings-plain" },
              { title: "Modal", path: "/account/home/settings-modal" },
            ],
          },
          {
            title: "Billing",
            children: [
              { title: "Basic Billing", path: "/account/billing/basic" },
              { title: "Enterprise", path: "/account/billing/enterprise" },
              { title: "Plans", path: "/account/billing/plans" },
              { title: "Billing History", path: "/account/billing/history" },
              { title: "Tax Info", disabled: true },
              { title: "Invoices", disabled: true },
              { title: "Gateaways", disabled: true },
            ],
          },
          {
            title: "Security",
            children: [
              { title: "Get Started", path: "/account/security/get-started" },
              {
                title: "Security Overview",
                path: "/account/security/overview",
              },
              {
                title: "IP Addresses",
                path: "/account/security/allowed-ip-addresses",
              },
              {
                title: "Privacy Settings",
                path: "/account/security/privacy-settings",
              },
              {
                title: "Device Management",
                path: "/account/security/device-management",
              },
              {
                title: "Backup & Recovery",
                path: "/account/security/backup-and-recovery",
              },
              {
                title: "Current Sessions",
                path: "/account/security/current-sessions",
              },
              { title: "Security Log", path: "/account/security/security-log" },
            ],
          },
          {
            title: "Members & Roles",
            children: [
              { title: "Teams Starter", path: "/account/members/team-starter" },
              { title: "Teams", path: "/account/members/teams" },
              { title: "Team Info", path: "/account/members/team-info" },
              {
                title: "Members Starter",
                path: "/account/members/members-starter",
              },
              { title: "Team Members", path: "/account/members/team-members" },
              {
                title: "Import Members",
                path: "/account/members/import-members",
              },
              { title: "Roles", path: "/account/members/roles" },
              {
                title: "Permissions - Toggler",
                path: "/account/members/permissions-toggle",
              },
              {
                title: "Permissions - Check",
                path: "/account/members/permissions-check",
              },
            ],
          },
          {
            title: "Other Pages",
            children: [
              { title: "Integrations", path: "/account/integrations" },
              { title: "Notifications", path: "/account/notifications" },
              { title: "API Keys", path: "/account/api-keys" },
              { title: "Appearance", path: "/account/appearance" },
              { title: "Invite a Friend", path: "/account/invite-a-friend" },
              { title: "Activity", path: "/account/activity" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Network",
    children: [
      {
        title: "General Pages",
        children: [
          { title: "Get Started", icon: Flag, path: "/network/get-started" },
          { title: "Colleagues", icon: Users, path: "#", disabled: true },
          { title: "Donators", icon: Heart, path: "#", disabled: true },
          { title: "Leads", icon: Zap, path: "#", disabled: true },
        ],
      },
      {
        title: "Other pages",
        children: [
          {
            title: "User Cards",
            children: [
              { title: "Mini Cards", path: "/network/user-cards/mini-cards" },
              { title: "Team Members", path: "/network/user-cards/team-crew" },
              { title: "Authors", path: "/network/user-cards/author" },
              { title: "NFT Users", path: "/network/user-cards/nft" },
              { title: "Social Users", path: "/network/user-cards/social" },
              { title: "Gamers", path: "#", disabled: true },
            ],
          },
          {
            title: "User Base",
            badge: "Datatables",
            children: [
              { title: "Team Crew", path: "/network/user-table/team-crew" },
              { title: "App Roster", path: "/network/user-table/app-roster" },
              {
                title: "Market Authors",
                path: "/network/user-table/market-authors",
              },
              { title: "SaaS Users", path: "/network/user-table/saas-users" },
              {
                title: "Store Clients",
                path: "/network/user-table/store-clients",
              },
              { title: "Visitors", path: "/network/user-table/visitors" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "User Management",
    icon: Users,
    children: [
      {
        title: "Users",
        path: "/user-management/users",
      },
      {
        title: "Roles",
        path: "/user-management/roles",
      },
      {
        title: "Permissions",
        path: "/user-management/permissions",
      },
      {
        title: "Account",
        path: "/user-management/account",
      },
      {
        title: "Logs",
        path: "/user-management/logs",
      },
      {
        title: "Settings",
        path: "/user-management/settings",
      },
    ],
  },
  {
    title: "Store - Client",
    children: [
      { title: "Home", path: "/store-client/home" },
      {
        title: "Search Results - Grid",
        path: "/store-client/search-results-grid",
      },
      {
        title: "Search Results - List",
        path: "/store-client/search-results-list",
      },
      { title: "Product Details", path: "/store-client/product-details" },
      { title: "Wishlist", path: "/store-client/wishlist" },
      {
        title: "Checkout",
        children: [
          {
            title: "Order Summary",
            path: "/store-client/checkout/order-summary",
          },
          {
            title: "Shipping Info",
            path: "/store-client/checkout/shipping-info",
          },
          {
            title: "Payment Method",
            path: "/store-client/checkout/payment-method",
          },
          {
            title: "Order Placed",
            path: "/store-client/checkout/order-placed",
          },
        ],
      },
      { title: "My Orders", path: "/store-client/my-orders" },
      { title: "Order Receipt", path: "/store-client/order-receipt" },
    ],
  },
];

export const MENU_HELP = [
  {
    title: "Getting Started",
    icon: Coffee,
    path: "https://keenthemes.com/metronic/tailwind/docs/getting-started/installation",
  },
  {
    title: "Support Forum",
    icon: AlertCircle,
    children: [
      {
        title: "All Questions",
        icon: FileQuestion,
        path: "https://devs.keenthemes.com",
      },
      {
        title: "Popular Questions",
        icon: Star,
        path: "https://devs.keenthemes.com/popular",
      },
      {
        title: "Ask Question",
        icon: HelpCircle,
        path: "https://devs.keenthemes.com/question/create",
      },
    ],
  },
  {
    title: "Licenses & FAQ",
    icon: Captions,
    path: "https://keenthemes.com/metronic/tailwind/docs/getting-started/license",
  },
  {
    title: "Documentation",
    icon: FileQuestion,
    path: "https://keenthemes.com/metronic/tailwind/docs",
  },
  { separator: true },
  { title: "Contact Us", icon: Share2, path: "https://keenthemes.com/contact" },
];

export const MENU_ROOT = [
  {
    title: "Public Profile",
    icon: UserCircle,
    rootPath: "/public-profile/",
    path: "/public-profile/profiles/default",
    childrenIndex: 2,
  },
  {
    title: "Account",
    icon: Settings,
    rootPath: "/account/",
    path: "/",
    childrenIndex: 3,
  },
  {
    title: "Network",
    icon: Users,
    rootPath: "/network/",
    path: "/network/get-started",
    childrenIndex: 4,
  },
  {
    title: "Authentication",
    icon: Shield,
    rootPath: "/authentication/",
    path: "/authentication/get-started",
    childrenIndex: 5,
  },
  {
    title: "Store - Client",
    icon: ShoppingCart,
    rootPath: "/store-client/",
    path: "/store-client/home",
    childrenIndex: 6,
  },
  {
    title: "User Management",
    icon: ShieldUser,
    rootPath: "/user-management/",
    path: "/user-management/users",
    childrenIndex: 7,
  },
];
