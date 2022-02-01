export class Product {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    public description: string,
    public image: string,
  ) {}
}

export interface ProductData {
  title: string;
  price: number;
  description: string;
  image: File | null;
}
