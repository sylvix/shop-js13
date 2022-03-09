import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './ui/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProductsComponent } from './pages/products/products.component';
import { MatCardModule } from '@angular/material/card';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ImagePipe } from './pipes/image.pipe';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productsReducer } from './store/products.reducer';
import { ProductsEffects } from './store/products.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from './pages/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { LoginComponent } from './pages/login/login.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { MatMenuModule } from '@angular/material/menu';
import { localStorageSync } from 'ngrx-store-localstorage';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ProductsComponent,
    EditProductComponent,
    FileInputComponent,
    ImagePipe,
    RegisterComponent,
    LoginComponent,
    CenteredCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forRoot({
      products: productsReducer,
      users: usersReducer
    }, {metaReducers}),
    EffectsModule.forRoot([ProductsEffects, UsersEffects]),
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
