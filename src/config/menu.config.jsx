// import { RiCurrencyFill, RiStore2Line } from "@remixicon/react";
import { RiStore2Line, RiCurrencyFill } from "@remixicon/react";
import {
  AlertCircle,
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
  Users,
  Briefcase as WorkIcon,
  Wrench,
  Zap,
} from "lucide-react";

export const MENU_SIDEBAR = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    children: [
      { title: "Overview", path: "/" },
      { title: "Activity Feed", path: "/dark-sidebar" },
      { title: "Alerts & Announcements", path: "/alert" },
    ],
  },
  { heading: "User" },
  {
    title: "Store Management",
    icon: RiStore2Line,
    children: [
      { title: "All Stores List", path: "/store-management" },
      {
        title: "Store Detail View",
        children: [
          { title: "Overview", path: "/store-detail-view" },
          {
            title: "Assigned Products",
            path: "/store-detail-view/assign-products",
          },
          { title: "Permissions", path: "/store-detail-view/permission-check" },
          { title: "Custom Domain", path: "/store-detail-view/custom-domin" },
          { title: "Branding", path: "/store-detail-view/branding" },
          {
            title: "Tasks & Setup Progress",
            path: "/store-detail-view/task-setupprogress",
          },
        ],
      },
      { title: "Store Onboarding Requests", path: "/public-profile/works" },
    ],
  },
  {
    title: "Product Management",
    icon: LayoutDashboard,
    children: [
      { title: "Product Master List", path: "/product-management" },
      { title: "Product Detail View", path: "/account/notifications" },
      { title: "Product Categories", path: "/account/api-keys" },
    ],
  },
  {
    title: "Order Management",
    icon: ListChecks,
    children: [
      { title: "All Orders", path: "/orders/all" },
      { title: "Return/ Repair Management", path: "/orders/return-repair" },
    ],
  },
  {
    title: "Pricing & Margins",
    icon: RiCurrencyFill,
    children: [
      { title: "Store Lists", path: "/pricing-margin/store-lists" },
      {
        title: "Store-specific Pricing Config",
        path: "/pricing-margin/pricing-config",
      },
      {
        title: "Pricing Tier Rules (P1, P2, P3)",
        path: "/pricing-margin/pricing-tier-rule",
      },
    ],
  },
  {
    title: "Custom Jewelry",
    icon: Gem,
    children: [
      { title: "All Custom Requests", path: "/custom-request" },
      { title: "Custom Requests Details", path: "/custom-requests-details" },
    ],
  },
  {
    title: "Store Content & Branding",
    icon: PieChart,
    children: [
      { title: "All Stores", path: "/social/scheduled-posts" },
      { title: "Store CMS", path: "/social/accounts" },
      { title: "Media Library", path: "/social/performance" },
    ],
  },
  {
    title: "Analytics & Reports",
    icon: ChartNoAxesCombined,
    children: [
      { title: "Sales Overview", path: "/users/super-admins" },
      { title: "Store Performance", path: "/users/roles-permissions" },
      { title: "Product Insights", path: "/users/activity-logs" },
      { title: "Inventory Insights", path: "/users/access-audit" },
      { title: "Traffic & Conversion", path: "/users/access-audit" },
    ],
  },
  {
    title: "Social Media Management",
    icon: BookCopy,
    children: [
      { title: "All Store List", path: "/support/tickets" },
      { title: "Post Scheduler", path: "/support/communication-log" },
      { title: "Promotions & Campaigns", path: "/support/notifications" },
      { title: "Engagement Reports", path: "/support/announcements" },
    ],
  },
  {
    title: "User & Role Management",
    icon: Users,
    children: [
      { title: "All Users List", path: "/support/tickets" },
      { title: "Roles & Access", path: "/support/communication-log" },
    ],
  },
  {
    title: "Billing & Finance",
    icon: FileText,
    children: [
      {
        title: "Store Subscription Plans",
        path: "/billing/subscription-plans",
      },
      { title: "Store Invoices", path: "/billing/invoices-payouts" },
      { title: "Payouts & Commissions", path: "/billing/transaction-history" },
      { title: "Subscription & Plans", path: "/billing/tax-compliance" },
    ],
  },
  {
    title: "Communication & Support",
    icon: MessagesSquare,
    children: [
      { title: "Internal Support Tickets", path: "/support/tickets" },
      { title: "Store-to-Admin Chat", path: "/support/communication-log" },
      { title: "Customer Escalations", path: "/support/notifications" },
      { title: "Notifications Center", path: "/support/announcements" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Platform Configurations", path: "/settings/platform" },
      { title: "Notification Preferences", path: "/settings/appearance-theme" },
    ],
  },
  {
    title: "Tools & Help",
    icon: Wrench,
    children: [
      { title: "Knowledge Base", path: "/tools/sandbox" },
      { title: "Video & Walkthrough Manager", path: "/tools/tasks" },
    ],
  },
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
