export const PanGestureHandler = 'PanGestureHandler';
export const BaseButton = 'BaseButton';
export const State = {
  BEGAN: 'BEGAN',
  ACTIVE: 'ACTIVE',
  END: 'END',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
};

export const gestureHandlerRootHOC = (Component: any) => Component;

export default {
  PanGestureHandler,
  BaseButton,
  State,
  gestureHandlerRootHOC,
}; 