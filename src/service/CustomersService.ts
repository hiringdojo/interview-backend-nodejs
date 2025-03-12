import { Customer } from '../domain/Customer';

export interface CustomersService {
  findByFilter(
    customer: Customer
  ): Promise<{ customers: Customer[]; total: number; totalPages: number }>;
}
