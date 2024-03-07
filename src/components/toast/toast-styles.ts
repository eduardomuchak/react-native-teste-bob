import { Dimensions, StyleSheet } from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

export const toastWidth = screenWidth > 380 ? 360 : screenWidth - 32
export const toastBorderWidth = 12

export const styles = StyleSheet.create({
  toastList: {
    flex: 1,
    gap: 8,
    position: 'absolute',
    elevation: 5,
    zIndex: 5,
    width: '100%',
    paddingVertical: 12
  },
  toastContainer: {
    backgroundColor: 'white',
    paddingLeft: 12,
    paddingBottom: 8,
    paddingTop: 4,
    paddingRight: 4,
    borderRadius: 8,
    alignSelf: 'center',
    minWidth: toastWidth,
    maxWidth: toastWidth,
    minHeight: 80,
    elevation: 10,
    zIndex: 5,
    borderLeftWidth: toastBorderWidth,
    gap: 8,
    shadowColor: '#3d3d3d',

    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { height: 4, width: 2 }
  },
  toastTime: {
    height: 3,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    top: 0,
    position: 'absolute',
    left: 0
  },
  toastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between'
  },
  toastTitle: {
    color: '#3d3d3d',
    paddingTop: 8,
    flex: 1
  },
  toastDescription: {
    color: '#3d3d3d',
    paddingRight: 8
  },
  feedbackIcon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginTop: 6
  }
})
