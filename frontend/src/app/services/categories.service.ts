import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { categoriesDownloadedAction } from '../redux/categories-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) { }

    public async getAllCategories() {
        if (store.getState().categoriesState.categories.length === 0) {
            const categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            store.dispatch(categoriesDownloadedAction(categories));
        }
        return store.getState().categoriesState.categories;
    }
}
