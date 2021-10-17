import { ProductModel } from "../models/product.model";


// Products State: 
export class ProductsState {
    public products: ProductModel[] = [];
    public editedProduct: ProductModel;
    public productsAmount: number;
}

// Product Action Types:
export enum ProductActionType {
    productsDownloaded = "productsDownloaded",
    productAdded = "productAdded",
    productUpdated = "productUpdated",
    productDeleted = "productDeleted",
    editedProductSelected = "editedProductSelected",
    productsAmountDownloaded = "productsAmountDownloaded"
}

// Product Action: 
export interface ProductAction {
    type: ProductActionType;
    payload?: any;
    // More specific type list:
    // payload: ProductModel[] | ProductModel | number;
}

// Product Action Creators: 
export function productsDownloadedAction(products: ProductModel[]): ProductAction {
    return { type: ProductActionType.productsDownloaded, payload: products };
}
export function productAddedAction(product: ProductModel): ProductAction {
    return { type: ProductActionType.productAdded, payload: product };
}
export function productUpdatedAction(product: ProductModel): ProductAction {
    return { type: ProductActionType.productUpdated, payload: product };
}
export function productDeletedAction(_id: number): ProductAction {
    return { type: ProductActionType.productDeleted, payload: _id };
}
export function editedProductSelectedAction(product: ProductModel): ProductAction {
    return { type: ProductActionType.editedProductSelected, payload: product };
}
export function productsAmountDownloadedAction(productsAmount: number): ProductAction {
    return { type: ProductActionType.productsAmountDownloaded, payload: productsAmount };
}

// Products Reducer:
export function productsReducer(currentState: ProductsState = new ProductsState(), action: ProductAction): ProductsState {

    const newState = { ...currentState };

    switch (action.type) {
        case ProductActionType.productsDownloaded: // Here payload is all products (ProductModel[])
            newState.products = action.payload;
            break;
        case ProductActionType.productAdded: // Here payload is the added product (ProductModel)
            newState.products.push(action.payload);
            if (newState.productsAmount !== undefined) {
                newState.productsAmount++;
            }
            break;
        case ProductActionType.productUpdated: { // Here payload is the updated product (ProductModel)
            const index = newState.products.findIndex(p => p._id === action.payload._id);
            newState.products[index] = action.payload;
            break;
        }
        case ProductActionType.productDeleted: { // Here payload is the deleted product's id (number)
            const index = newState.products.findIndex(p => p._id === action.payload);
            newState.products.splice(index, 1);
            break;
        }
        case ProductActionType.editedProductSelected:
            newState.editedProduct = action.payload;
            break
        case ProductActionType.productsAmountDownloaded:
            newState.productsAmount = action.payload;
            break;
    }

    return newState;
}