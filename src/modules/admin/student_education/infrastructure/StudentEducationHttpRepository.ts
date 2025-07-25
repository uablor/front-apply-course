import { AxiosApi } from "@/configurations/axios.config";
import { inject, injectable } from "tsyringe";
import type { IStudentEducationRepository } from "../domain/repositories/IStudentEducationRepository";
import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface";
import type { IResponse } from "@/domain/interfaces/Ipagination.interface";import type { DeleteType } from "@/shared/enums/deletetype.enum";
import type { CreateStudentEducationModel, FindStudentEducationModel, UpdateStudentEducationModel } from "../domain/models/education.model";

@injectable()
export class StudentEducationHttpRepository implements IStudentEducationRepository {
  constructor(@inject(AxiosApi) private readonly _api: AxiosApi) {}

  async create(payload: CreateStudentEducationModel): Promise<string> {
      const res = await this._api.axios.post("/teacher", payload);
      return res.data;
  }

  async update(data: UpdateStudentEducationModel): Promise<FindStudentEducationModel> {
    const { id, ...rest } = data;
    console.log(id, rest);
    const res = await this._api.axios.patch("/teacher/" + id, rest);
    return res.data;
  }


  async delete(id: number, type: DeleteType): Promise<string> {
    const res = await this._api.axios.delete(`/teacher/${type}/${id}`);
    return res.data;
  }
  async restore(id: number): Promise<string> {
    const res = await this._api.axios.patch(`/teacher/restore/${id}`);
    return res.data;
  }


//   async findone(): Promise<string> {
//     const res = await this._api.axios.post("/auth/refresh");
//     return res.data.token;
//   }

  async findAll(query: IPaginationQuery): Promise<IResponse<FindStudentEducationModel>> {
    const res = await this._api.axios.get("/teacher", { params: query  });
    // console.log("asdfadsf",res.data);
    return res.data;
  }

//   async findAllProvince(): Promise<[]> {
//     const res = await this._api.axios.get("/province");
//     return res.data;
//   }

//   async findAllDistrict(id: number): Promise<[]> {
//     console.log("asdfadsf",id);
//     const res = await this._api.axios.get("/district/" ,{ params: {id } });
//     console.log("asdfadsf",res.data);
//     return res.data;
//   }
}
