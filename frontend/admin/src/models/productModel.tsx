export interface Product {
  
   _id?: string;
  name?: string;
  description?: string;
  category?: string;
  subCategory?: string;
  price?: number;
  sizes?: string[];
  bestseller?: boolean;
  img1?: string | null;
  img2?: string | null;
  img3?: string | null;
  img4?: string | null;
  Reviews?: number;
  
}

