import type { IPaginationQuery } from "@/domain/models/IPaginationQuery.interface"
import type { IResponse } from "@/domain/interfaces/Ipagination.interface"
import type { DeleteType } from "@/shared/enums/deletetype.enum"
import type { CreateRoleModel, FindRoleModel, UpdateRoleModel } from "../models/role.model"


export interface IRoleRepository {
  create(payload: CreateRoleModel): Promise<string> 
  update(data:UpdateRoleModel): Promise<FindRoleModel>
  delete(id: number, type: DeleteType): Promise<string>
  restore(id: number): Promise<string>
  // findone():Promise<string>
  findAll(query: IPaginationQuery): Promise<IResponse<FindRoleModel>> 

}
