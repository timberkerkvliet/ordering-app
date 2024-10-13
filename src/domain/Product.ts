import { Category } from "./Category";
import bigDecimal from "js-big-decimal";

export type Product = {
    name: string
    price: bigDecimal
    category: Category
}
