import type { address } from "@/domain/models/address.entity";
import type { timestamp } from "@/domain/models/best.timestamp.entity";

export interface RoleModel {
  id: number;
  name: string;
  display_name: string;
  permissions: string[];
}

export interface CreateRoleModel extends Omit<RoleModel, "id"> {
}

export interface FindRoleModel extends RoleModel, timestamp {
}

export interface UpdateRoleModel extends RoleModel {}
