export interface Category {
  id: number;
  name: string;
}

export interface CategoriesState {
  categories: Category[] | null;
  activeCategory: Category | null;

  loading: boolean;
  error: string | null;
}

export interface UserData {
  name: string;
}