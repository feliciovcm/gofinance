import React, { useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../contexts/AuthContext';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleGoogleAuth() {
    try {
      setLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  async function handleAppleAuth() {
    try {
      setLoading(true)
      await signInWithApple();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton title='Entrar com Google' svg={GoogleSvg} onPress={handleGoogleAuth} />
          {Platform.OS === 'ios' && (
            <SignInSocialButton title='Entrar com Apple' svg={AppleSvg} onPress={handleAppleAuth} />
          )}
          {loading && <ActivityIndicator color={theme.colors.primary} size="small" />}
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
