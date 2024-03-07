import React, { useRef, type ReactNode } from 'react'
import { Pressable, SafeAreaView, StatusBar, View } from 'react-native'
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import { styles } from './bottom-sheet-skia.styles'

type BottonSheetActions = {
  closeBottomSheet: () => void
}

type BottomSheetGustavaoProps = {
  minHeight: number
  maxHeight?: number
  children: (data: BottonSheetActions) => React.ReactNode | ReactNode
}

export function BottomSheetGustavao({ minHeight, children, maxHeight }: BottomSheetGustavaoProps) {
  const translateY = useSharedValue(minHeight)
  const isOpen = useRef<boolean>(false)

  const gesture = Gesture.Pan()
    .onChange((e) => {
      let value = translateY.value
      const newValue = (value += e.changeY)

      if (newValue > 6) {
        translateY.value = newValue
      }
    })
    .onEnd((e) => {
      const diferencaDeDistancia = 120
      const somaElementosDaTelaHeight = 56 + 60 + (StatusBar.currentHeight || 0)
      const distanceToOpen = isOpen.current
        ? somaElementosDaTelaHeight + diferencaDeDistancia
        : minHeight + somaElementosDaTelaHeight - diferencaDeDistancia

      if (e.absoluteY < distanceToOpen) {
        isOpen.current = true
        translateY.value = withSpring(maxHeight ? distanceToOpen - maxHeight : 8, {
          mass: 1,
          damping: 50,
          stiffness: 50
        })
      } else if (e.absoluteY >= distanceToOpen) {
        isOpen.current = false
        translateY.value = withSpring(minHeight, {
          mass: 1,
          damping: 50,
          stiffness: 50
        })
      }
    })

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  const openBottomSheet = () => {
    if (maxHeight) {
      isOpen.current = true
      const diferencaDeDistancia = 160
      const somaElementosDaTelaHeight = 56 + 60 + (StatusBar.currentHeight || 0)
      const distanceToOpen = isOpen.current
        ? somaElementosDaTelaHeight + diferencaDeDistancia
        : minHeight + somaElementosDaTelaHeight - diferencaDeDistancia

      translateY.value = withSpring(distanceToOpen - maxHeight, {
        mass: 1,
        damping: 50,
        stiffness: 50
      })
    } else {
      isOpen.current = true
      translateY.value = withSpring(8, {
        mass: 1,
        damping: 50,
        stiffness: 50
      })
    }
  }

  const closeBottomSheet = () => {
    isOpen.current = false
    translateY.value = withSpring(minHeight, {
      mass: 1,
      damping: 50,
      stiffness: 50
    })
  }

  return (
    <Animated.View style={[styles.bottomSheetContainer, style]} entering={SlideInDown}>
      <GestureDetector gesture={gesture}>
        <Pressable onPress={openBottomSheet} style={styles.gestureContainer}>
          <View style={styles.gestureActionIcon} />
        </Pressable>
      </GestureDetector>
      <View style={{ marginTop: -42 }}>
        {children({
          closeBottomSheet
        })}
      </View>
      <SafeAreaView />
    </Animated.View>
  )
}
