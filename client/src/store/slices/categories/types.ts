import { ErrorState } from 'utils/asyncSetters';

export interface Category {
  id: number;
  name: string;
}

export interface CategoriesState extends ErrorState {
  categories: Category[] | null;
  activeCategory: Category | null;
}

export interface UserData {
  name: string;
}