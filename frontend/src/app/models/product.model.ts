export class Product {
  constructor(
    public title: string,
    public price: number,
    public description: string,
    public id: string,
  ) {}
}

export interface ProductData {
  title: string;
  price: number;
  description: string;
}
