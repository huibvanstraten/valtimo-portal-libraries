import {Data, Route} from '@angular/router';

interface PortalRouteData extends Data {
  hideInNav?: boolean;
  title: string;
}

interface PortalRoute extends Route {
  data?: PortalRouteData;
}

export {PortalRoute};
