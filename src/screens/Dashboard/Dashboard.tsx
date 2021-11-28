import React from "react";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserWrapper,
  UserName,
  UserGreeting,
  Icon,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/77253561?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá ,</UserGreeting>
              <UserName>Vitor</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
}
