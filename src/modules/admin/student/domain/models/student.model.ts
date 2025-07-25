import type { address } from "@/domain/models/address.entity";
import type { timestamp } from "@/domain/models/best.timestamp.entity";

export interface StudentModel {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface CreateStudentModel extends Omit<StudentModel, "id"> {
  password: string;
  birth_date: string | null;
  gender: string | null;
  district: number;

}

export interface FindStudentModel extends StudentModel,timestamp,address {
  birth_date: string | null;
  gender: string | null;
}

export interface UpdateStudentModel extends StudentModel, Pick<address, "district_id" > {
  birth_date: string | null;
  gender: string | null;
  
}