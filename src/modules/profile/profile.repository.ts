import { Injectable } from "node_modules/@nestjs/common";
import { InjectModel } from "node_modules/@nestjs/mongoose/dist";
import { Profile } from "./profile.schema";
import { FilterQuery, Model, Types } from "mongoose";
import { GetProfilesQueryDto } from "./dto/get-profiles-query.dto";
import { ProfileType } from "./profile.type";

@Injectable()
export class ProfileRepository {
    constructor(
        @InjectModel(Profile.name)
        private readonly profileModel: Model<Profile>
    ) {}

    async findAll(query: GetProfilesQueryDto, filter: FilterQuery<Profile>): Promise<[Profile[], number]> {
        const [profileList, totalProfileCount]: [Profile[], number] = await Promise.all([
            this.profileModel
            .find(filter)
            .sort({ createdAt: -1 }) // Sort by creation date (newest first)
            .skip( (query.page - 1) * query.limit )
            .limit(query.limit)
            .exec(),

            this.profileModel.countDocuments(filter).exec()
        ]);

        return [profileList, totalProfileCount];
    }

    async findOne(id: string): Promise<Profile> {
        return await this.profileModel.findById(id).exec();
    }

    async findOneByUserId(userId: Types.ObjectId | string): Promise<Profile> {
        return await this.profileModel.findOne({ user: new Types.ObjectId(userId) }).exec();
    }

    async create(profile: ProfileType): Promise<Profile> {
        return await this.profileModel.create(profile);
    }

    async update(id: string, profile: ProfileType): Promise<Profile> {
        return await this.profileModel.findByIdAndUpdate(
            id,
            profile,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async remove(id: string): Promise<Profile> {
        return await this.profileModel.findByIdAndDelete(id);
    }
    
    async removeByUserId(userId: string): Promise<Profile> {
        return await this.profileModel.findOneAndDelete({ user: new Types.ObjectId(userId) });
    }
}