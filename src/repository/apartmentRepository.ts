import { Op } from "sequelize";
import { Apartment } from "../model/apartmentModel.js";
export class ApartmentRepository {
    async create(apartment: any) {
        return await Apartment.create(apartment);
    }
    async findById(id: number) {
        return await Apartment.findByPk(id);
    }
     async findByEmail(email:string) {
        return await Apartment.findOne({where:{email}});
    }

    async getApartments(filters: any, page: number, limit: number) {
        const whereClause: any = {};
        const offset = (page - 1) * limit;
        if (filters.city) { whereClause.city = filters.city; }
        if (filters.area) { whereClause.area = filters.area; }
        if (filters.minPrice || filters.maxPrice) {
            whereClause.price = {}
            if (filters.minPrice) { whereClause.price[Op.gte] = Number(filters.minPrice) }
            if (filters.maxPrice) { whereClause.price[Op.lte] = Number(filters.maxPrice) }
        }
        const { count, rows } = await Apartment.findAndCountAll({
            where: whereClause,
            limit: limit,
            offset: offset
        })
        return {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
            data: rows
        }

    }
    async update(id: number, data: {}) {
        const apartment = await Apartment.findByPk(id);
        if (!apartment) return null;
        await apartment.update(data)
        return apartment;

    }
    async delete(id: string) {
        const apartment = await Apartment.findByPk(id);
        if (!apartment) return false;
        await apartment.destroy();
        return true;

    }
    async save(apartment: any) {
        return apartment.save();
    }
}   