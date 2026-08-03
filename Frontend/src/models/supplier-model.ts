export type SupplierModel = {
    id: number;
    company: string;
    country: string;
    city: string;
    address: string;
    phone: string;
    imageUrl: string;
    image?: File; //Only for sending and image to the backend
}
