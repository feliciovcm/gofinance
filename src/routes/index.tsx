import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { PublicRoutes } from './public.routes';
import { useAuth } from '../contexts/AuthContext';
import { AppRoutes } from './app.routes';

export function Routes() {

  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
}

