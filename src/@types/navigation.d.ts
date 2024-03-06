import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AppRoutesList } from '@/routes/types.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutesList {}
  }

  type RootStackNavigation = StackNavigationProp<RootParamList>;
  type RootStackRouteProp<T extends keyof RootParamList> = RouteProp<
    RootParamList,
    T
  >;
}
