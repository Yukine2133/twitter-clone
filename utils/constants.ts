import {
  Bars3BottomLeftIcon,
  BellIcon,
  BookmarkIcon,
  EnvelopeIcon,
  HashtagIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";

const SolidHomeIcon = SolidIcons.HomeIcon as any;
const SolidHashTagIcon = SolidIcons.HashtagIcon as any;
const SolidBookmarkIcon = SolidIcons.BookmarkIcon as any;
const SolidUserCircleIcon = SolidIcons.UserCircleIcon as any;
const SolidBellIcon = SolidIcons.BellIcon as any;
const SolidBars3BottomLeftIcon = SolidIcons.Bars3BottomLeftIcon as any;
const SolidEnvelope = SolidIcons.EnvelopeIcon as any;

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
    disabled: true,
  },
  {
    Icon: UserCircleIcon,
    SolidIcon: SolidUserCircleIcon,
    route: "/profile",
    label: "Profile",
  },
];
