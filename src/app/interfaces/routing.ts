import {Data, Route} from '@angular/router';

interface PortalRouteData extends Data {
  hideInNav?: boolean;
  title: string;
  icon: string;
}

interface PortalRoute extends Route {
  data?: PortalRouteData;
}

export {PortalRoute};
