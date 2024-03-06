import React from 'react';
import { Pressable, Text } from 'react-native';

export function Botao({ title }: { title: string }) {
  return (
    <Pressable>
      <Text>{title}</Text>
    </Pressable>
  );
}
