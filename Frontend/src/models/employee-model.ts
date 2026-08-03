export type EmployeeModel = {
    id: number;
    firstName: string;
    lastName: string;
    title: string;
    country: string;
    city: string;
    birthDate: string;
    imageUrl: string;
    


    image: File; //Only for sending and image to the backend
}
