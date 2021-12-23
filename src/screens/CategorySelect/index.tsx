import React from "react";
import { Button } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";
import {
  Category,
  Container,
  CustomFlatList,
  Footer,
  Header,
  Icon,
  ItemName,
  Separator,
  Title
} from "./styles";

type Category = {
  key: string;
  name: string;
  icon: string;
  color: string;
};

interface CategorySelectProps {
  category: Category;
  handleChosenCategory: (category: Category) => void;
  closeCategorySelectModal: () => void;
}

export function CategorySelect(props: CategorySelectProps) {
  const { category, handleChosenCategory, closeCategorySelectModal } = props;
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <CustomFlatList
        data={categories}
        keyExtractor={(item: any) => item.key}
        renderItem={({ item }: any) => (
          <Category
            onPress={() => handleChosenCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <ItemName>{item.name}</ItemName>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <Footer>
        <Button title="Selecionar" onPress={closeCategorySelectModal} />
      </Footer>
    </Container>
  );
}
