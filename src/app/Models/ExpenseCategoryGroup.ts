import { ExpenseCategory } from "./ExpenseCategory";

export interface ExpenseCategoryGroup {
  GroupName: string;
  ExpenseCategories: ExpenseCategory[];
}
