import {Data, Route} from '@angular/router';

interface PortalRouteData extends Data {
  hideInNav?: boolean;
  title: string;
  icon: string;
  animation?: string;
  isHome?: boolean;
}

interface PortalRoute extends Route {
  data?: PortalRouteData;
}

export {PortalRoute};
