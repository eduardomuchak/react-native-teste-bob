import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    top: 0,
    overflow: 'hidden',
    borderWidth: 0.8,
    borderColor: '#00000044',
  },
  gestureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 100,
    height: 64,
  },
  gestureActionIcon: {
    width: 68,
    height: 5,
    position: 'absolute',
    top: 16,
    backgroundColor: theme.colors.status.transmitida,
    borderRadius: 8,
  },
});