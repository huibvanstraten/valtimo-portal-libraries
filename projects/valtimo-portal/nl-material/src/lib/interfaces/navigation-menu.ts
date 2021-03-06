import {ElementRef, QueryList} from '@angular/core';

type NavLinkElements = QueryList<ElementRef<HTMLLinkElement>>;

interface NavigationMenuItem {
  link: string;
  title: string;
  icon: string;
}

interface ActiveNavLinkIndicator {
  width: number;
  offset: number;
  previousOffset: number;
}

export {NavigationMenuItem, NavLinkElements, ActiveNavLinkIndicator};
