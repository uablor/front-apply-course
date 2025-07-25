import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface"
import type { IResponse } from "@/domain/interfaces/Ipagination.interface"
import type { CreateStudentModel, FindStudentModel, UpdateStudentModel } from "../models/student.model"
import type { DeleteType } from "@/shared/enums/deletetype.enum"


export interface IStudentRepository {
  create(payload: CreateStudentModel): Promise<string> 
  update(data:UpdateStudentModel): Promise<FindStudentModel>
  delete(id: number, type: DeleteType): Promise<string>
  restore(id: number): Promise<string>
  findone():Promise<string>
  findAll(query: IPaginationQuery): Promise<IResponse<FindStudentModel>> 
  findAllProvince(): Promise<[]>
  findAllDistrict(id: number): Promise<[]>
}
