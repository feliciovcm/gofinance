import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button(props: ButtonProps) {
  const { title } = props;
  return (
    <Container {...props}>
      <Title>{title}</Title>
    </Container>
  );
}
