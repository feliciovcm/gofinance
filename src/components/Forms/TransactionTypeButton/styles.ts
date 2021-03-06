import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler'

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled.View<ContainerProps>`
  border-radius: 5px;
  width: 48%;

  ${({ isActive, type }) =>
    isActive && type === "up"
      ? css`
          background-color: ${({ theme }) => theme.colors.success_light};
          border: none;
        `
      : isActive && type === "down"
      ? css`
          background-color: ${({ theme }) => theme.colors.attention_light};
          border: none;
        `
      : css`
          border-width: 1.5px;
          border-color: ${({ theme }) => theme.colors.text};
        `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;
