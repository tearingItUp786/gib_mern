export interface BRC {
  _id: string;
  brc: number;
  date: string;
  invoice: Invoice;
  warehouse: Warehouse;
  product: Product;
  volume: string;
  quantity: number;
  productType: ProductType;
  dateCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Invoice {
  _id: string;
  type: string;
  carrier: string;
  shipper: string;
  referenceNumber: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Warehouse {
  _id: string;
  address: Address;
  __v: number;
}

export interface Address {
  country: string;
  province: string;
  city: string;
  postalCode: string;
  street: string;
  unitNumber: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductType {
  _id: string;
  volumes: VolumesItem[];
  typeName: string;
  __v: number;
}

export interface VolumesItem {
  _id: string;
  volume: string;
  __v: number;
}

export interface ProductCardProps {
  _id: string;
  name: string;
  image: string;
  brc: number;
  dateCode: string;
  typeName: string;
  volume: string;
  quantity: number;
}
