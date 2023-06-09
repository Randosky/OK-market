export interface IProductItem {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[],
    searchData: string,
    isBasket: boolean,
    countToBuy: number,
    discountPrice: number,
}