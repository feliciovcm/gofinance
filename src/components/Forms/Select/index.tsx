import React from "react";
import { Category, Container, Icon } from "./styles";

interface CustomSelectProps {
  title: string;
  onPress: () => void;
}

export function CustomSelect(props: CustomSelectProps) {
  const { title, onPress } = props;
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
