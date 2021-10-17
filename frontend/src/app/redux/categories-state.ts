import { CategoryModel } from "../models/category.model";

export class CategoriesState {
    public categories: CategoryModel[] = [];
}

export enum CategoryActionType {
    categoriesDownloaded = "categoriesDownloaded"
}

export interface CategoryAction {
    type: CategoryActionType;
    payload: any;
}

export function categoriesDownloadedAction(categories: CategoryModel[]): CategoryAction {
    return { type: CategoryActionType.categoriesDownloaded, payload: categories };
}

export function categoriesReducer(currentState: CategoriesState = new CategoriesState(), action: CategoryAction): CategoriesState {

    const newState = { ...currentState };
    
    switch (action.type) {
        case CategoryActionType.categoriesDownloaded:
            newState.categories = action.payload;
            break;
    }
    return newState;
}