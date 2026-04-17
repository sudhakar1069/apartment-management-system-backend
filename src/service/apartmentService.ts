
export class ApartmentService {
    constructor(private apartmentRepository: any) { }
     baseURL="http://localhost:5000";
    async registerApartment(data:any) {
        const { title, description, area, city,price,noOfFlats,ownerName,contactNumber,email,image} = data;
        const apartment = await this.apartmentRepository.create({
            title,
            description,
            city,
            area,
            price,
            noOfFlats,
            ownerName,
            contactNumber,
            email,
            image:image?`${this.baseURL}/uploads/${data.image}`:null
        })
        return apartment;
    }

    async getApartments(filters:any,page:number,limit:number) {
        const apartments = await this.apartmentRepository.getApartments(filters,page,limit);
        return apartments;
    }

    async updateApartment(id: number, data: any) {
        const updatedApartment = await this.apartmentRepository.update(id, data)
        if (!updatedApartment) {
            throw ({ status: 404, message: "apartment not found" })
        }
        return updatedApartment;
    }

    async deleteApartment(id: number) {
        const deleted = await this.apartmentRepository.delete(id)
        if (!deleted) {
            throw ({ status: 404, message: "apartment not found" })
        }
        return ({ message: "apartment removed successfully" })
    }
}