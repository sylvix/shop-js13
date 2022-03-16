import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { productsReducer } from './store/products.reducer';
import { usersReducer } from './store/users.reducer';
import { categoriesReducer } from './store/categories.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products.effects';
import { UsersEffects } from './store/users.effects';
import { CategoriesEffects } from './store/categories.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  products: productsReducer,
  users: usersReducer,
  categories: categoriesReducer,
};

const effects = [ProductsEffects, UsersEffects, CategoriesEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
