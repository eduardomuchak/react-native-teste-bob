/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons } from '@expo/vector-icons';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import Animated, {
  CurvedTransition,
  Easing,
  FadeInUp,
  SlideOutRight,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import { Text } from '../text/text-component';

import type { PressableProps } from 'react-native/Libraries/Components/Pressable/Pressable';

import Check from '../../assets/icons/check.svg';
import Close from '../../assets/icons/close.svg';
import Info from '../../assets/icons/info-quadrado.svg';
import Sino from '../../assets/icons/sino.svg';
import { theme } from '../../theme';
import { AppError } from '../../utils/app-error';
import { toast } from './toast-handler';
import { styles, toastBorderWidth, toastWidth } from './toast-styles';
import type {
  ContainerPositionProps,
  FeedbackTypeLiterals,
  IToast,
  ToastFeedbackType,
  ToastOptions,
  ToastProps,
} from './toast-types';

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

export function ToastContainer() {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const isBottom = toasts.every((toast) => toast.position === 'bottom');

  const toastsByPosition = (position: ToastOptions['position']) => {
    return toasts.filter((toast) => toast.position === position);
  };

  const createNewToast = (newToast: Omit<IToast, 'id'>) => {
    const alreadyMessage = toasts.some(
      (toast) => toast.message === newToast.message
    );

    if (alreadyMessage) return;

    const toast: IToast = {
      ...newToast,
      position: newToast.position || 'top',
      message: newToast.message,
      id: new Date().toISOString(),
    };

    setToasts([...toasts, toast]);
  };

  const onDismiss = (toastId: string) => {
    deleteToastById(toastId);
  };

  const deleteToastById = (toastId: string) => {
    setToasts((toast) => toast.filter((toast) => toast.id !== toastId));
  };

  const errorHandler = (error: unknown) => {
    if (typeof error === 'string') return error;

    if (error instanceof Error) return error.message;

    if (error instanceof AppError) return error.message;

    return 'Ocorreu um Erro na sua solicitação!';
  };

  toast.success = (message, options) => {
    if (typeof message === 'string') {
      createNewToast({ message, type: 'success', ...options });
    }
  };

  toast.info = (message, options) => {
    if (typeof message === 'string') {
      createNewToast({ message, type: 'info', ...options });
    }
  };

  toast.notify = (message, options) => {
    if (typeof message === 'string') {
      createNewToast({ message, type: 'notify', ...options });
    }
  };

  toast.error = (message, options) => {
    createNewToast({
      message: errorHandler(message),
      type: 'error',
      ...options,
    });
  };

  return (
    <Fragment>
      {toasts.length ? (
        <ContainerPosition position="top">
          {toastsByPosition('top').map((toast) => (
            <Toast key={toast.id} onDismiss={onDismiss} {...toast} />
          ))}
        </ContainerPosition>
      ) : null}
      {toasts.length && isBottom ? (
        <ContainerPosition position="bottom">
          {toastsByPosition('bottom').map((toast) => (
            <Toast key={toast.id} onDismiss={onDismiss} {...toast} />
          ))}
        </ContainerPosition>
      ) : null}
    </Fragment>
  );
}

function ContainerPosition({ position, children }: ContainerPositionProps) {
  return (
    <GestureHandlerRootView
      style={[
        styles.toastList,
        {
          top: position === 'top' ? 0 : undefined,
          bottom: position === 'bottom' ? 48 : undefined,
        },
      ]}
    >
      <SafeAreaView />
      {children}
    </GestureHandlerRootView>
  );
}

function Toast({
  autoHide = true,
  onDismiss,
  time = 5000,
  message,
  onPress,
  onHide,
  onShow,
  title,
  type,
  id,
}: ToastProps) {
  const [openToast, setOpenToast] = useState(false);

  const sliderWidth = useSharedValue(toastWidth - toastBorderWidth);
  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const maxMessageLength = message.slice(0, 90);

  sliderWidth.value = withTiming(0, {
    duration: time,
    easing: Easing.linear,
  });

  const animatedSwipStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const exitingStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(translateX.value, { duration: 250 }) },
      { scale: withTiming(pressed.value ? 1.05 : 1) },
    ],
  }));

  const closeToast = useCallback(() => {
    opacity.value = 0;
    translateX.value = offset.value;
    onDismiss(id);
  }, []);

  const handleToastLongPress = () => {
    setOpenToast(true);
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize((e) => {
      if (e.translationX < 80) {
        offset.value = withSpring(0);
      }
      pressed.value = false;
    })
    .onEnd((e) => {
      if (e.translationX > 80) {
        runOnJS(closeToast)();
      }
    });

  const sliderStyle = useAnimatedStyle(() => ({
    width: sliderWidth.value,
  }));

  useEffect(() => {
    if (openToast || !autoHide) return;

    const timerId = setTimeout(() => {
      closeToast();
    }, time);

    return () => {
      clearTimeout(timerId);
    };
  }, [autoHide, closeToast, openToast, time]);

  useEffect(() => {
    onShow && onShow();

    return () => {
      onHide && onHide();
    };
  }, []);

  if (!title && !title?.trim()?.length) {
    title = feedbackTitle[type];
  }

  if (openToast) {
    sliderWidth.value = withTiming(sliderWidth.value);
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={exitingStyles}
        layout={CurvedTransition.duration(350)}
      >
        <PressableAnimated
          entering={FadeInUp.delay(50).duration(350)}
          onLongPress={handleToastLongPress}
          exiting={SlideOutRight.duration(200)}
          onPress={onPress || undefined}
          style={[
            animatedSwipStyles,
            styles.toastContainer,
            { borderColor: feedbackColors[type] },
          ]}
        >
          {autoHide && (
            <Animated.View
              style={[
                sliderStyle,
                styles.toastTime,
                { backgroundColor: feedbackColors[type] },
              ]}
            />
          )}

          <View style={styles.toastHeader}>
            <FeedbackIcon feedbackType={type} />
            <Text style={styles.toastTitle} fontWeight="bold">
              {title}
            </Text>
            <CloseToastButton onPress={closeToast} />
          </View>

          <Text
            style={styles.toastDescription}
            fontWeight="semiBold"
            numberOfLines={openToast ? undefined : 2}
            fontSize="sm"
          >
            {openToast ? message : maxMessageLength}
          </Text>
        </PressableAnimated>
      </Animated.View>
    </GestureDetector>
  );
}

function CloseToastButton(props: PressableProps) {
  return (
    <Pressable {...props} style={{ paddingTop: 4 }}>
      <Ionicons name="close-sharp" size={24} color="black" />
    </Pressable>
  );
}

function FeedbackIcon({ feedbackType }: { feedbackType: ToastFeedbackType }) {
  return (
    <View
      style={[
        styles.feedbackIcon,
        { backgroundColor: feedbackColors[feedbackType] },
      ]}
    >
      {iconsFeedback[feedbackType]}
    </View>
  );
}

const iconsFeedback: Record<ToastFeedbackType, ReactNode> = {
  success: <Check />,
  error: <Close />,
  info: <Info />,
  notify: <Sino />,
};

const feedbackColors: FeedbackTypeLiterals = {
  success: theme.colors.success,
  notify: theme.colors.notify,
  error: theme.colors.error,
  info: theme.colors.info,
};

const feedbackTitle: FeedbackTypeLiterals = {
  notify: 'Notificação',
  success: 'Sucesso',
  error: 'Erro',
  info: 'Info',
};
