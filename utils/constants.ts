import {
  Bars3BottomLeftIcon,
  BellIcon,
  BookmarkIcon,
  EnvelopeIcon,
  HashtagIcon,
  HomeIcon,
  UserCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";

const SolidHomeIcon = SolidIcons.HomeIcon as any;
const SolidHashTagIcon = SolidIcons.HashtagIcon as any;
const SolidBookmarkIcon = SolidIcons.BookmarkIcon as any;
const SolidUserCircleIcon = SolidIcons.UserCircleIcon as any;
const SolidBellIcon = SolidIcons.BellIcon as any;
const SolidBars3BottomLeftIcon = SolidIcons.Bars3BottomLeftIcon as any;
const SolidEnvelope = SolidIcons.EnvelopeIcon as any;
const SolidCheckBadge = SolidIcons.CheckBadgeIcon as any;

export const sidebarLinks = [
  {
    Icon: HomeIcon,
    SolidIcon: SolidHomeIcon,
    route: "/",
    label: "Home",
  },
  {
    Icon: HashtagIcon,
    SolidIcon: SolidHashTagIcon,
    route: "/search",
    label: "Explore",
  },
  {
    Icon: BellIcon,
    SolidIcon: SolidBellIcon,
    route: "/notifications",
    label: "Notifications",
  },
  {
    Icon: EnvelopeIcon,
    SolidIcon: SolidEnvelope,
    route: "/messages",
    label: "Messages",
  },
  {
    Icon: BookmarkIcon,
    SolidIcon: SolidBookmarkIcon,
    route: "/bookmarks",
    label: "Bookmarks",
  },
  {
    Icon: Bars3BottomLeftIcon,
    SolidIcon: SolidBars3BottomLeftIcon,
    route: "/lists",
    label: "Lists",
  },
  {
    Icon: CheckBadgeIcon,
    SolidIcon: SolidCheckBadge,
    route: "/premium",
    label: "Premium",
  },
  {
    Icon: UserCircleIcon,
    SolidIcon: SolidUserCircleIcon,
    route: "/profile",
    label: "Profile",
  },
];

export const premiumFeatures = [
  {
    name: "Half Ads in For You and Following",
    tooltip: "See 50% fewer ads in your For You and Following timelines",
  },
  {
    name: "Larger reply boost",
    tooltip: "Your replies will be boosted in conversations",
  },
  {
    name: "Get paid to post",
    tooltip: "Earn money from your posts through our creator program",
  },
  {
    name: "Checkmark",
    tooltip: "Get the blue checkmark after verification",
  },
  {
    name: "Grok with increased limits",
    tooltip: "Access to AI with higher usage limits",
  },
  {
    name: "X Pro, Analytics, Media Studio",
    tooltip: "Access to professional tools and analytics",
  },
  {
    name: "Creator Subscriptions",
    tooltip: "Ability to offer subscriptions to your followers",
  },
];
