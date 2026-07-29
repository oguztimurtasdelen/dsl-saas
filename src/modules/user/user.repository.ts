import { Injectable } from "node_modules/@nestjs/common";
import { InjectModel } from "node_modules/@nestjs/mongoose/dist";
import { User } from "./user.schema";
import { FilterQuery, Model } from "mongoose";
import { GetUsersQueryDto } from "./dto/get-users-query.dto";
import { UserType } from "./user.type";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async findAll(query: GetUsersQueryDto, filter: FilterQuery<User>): Promise<[User[], number]> {
        const [userList, totalUserCount]: [User[], number] = await Promise.all([
            this.userModel
            .find(filter)
            .select("-password")
            .sort({ createdAt: -1 })
            .skip( (query.page - 1) * query.limit )
            .limit(query.limit)
            .populate('profile')
            .exec(),

            this.userModel.countDocuments(filter).exec()
        ]);

        return [userList, totalUserCount];
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email }).exec();
    }

    async create(user: UserType): Promise<User> {
        return await this.userModel.create(user);
    }

    async update(id: string, user: UserType): Promise<User> {
        return await this.userModel.findByIdAndUpdate(
            id,
            user,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async remove(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    }
}