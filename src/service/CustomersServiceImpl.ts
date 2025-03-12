import { CustomersService } from './CustomersService';
import { CustomersRepository } from '../repository/CustomersRepository';
import { Customer } from '../domain/Customer';

export class CustomersServiceImpl implements CustomersService {
  constructor(private repository: CustomersRepository) {}

  async findByFilter(
    customer: Customer
  ): Promise<{ customers: Customer[]; total: number; totalPages: number }> {
    const sizePage = 10;

    const customers = (await this.repository.findByFilter(customer)).map(
      (item) =>
        new Customer({
          ...item,
          email: `${item.name.charAt(0)}${item.lastName}@ihfintech.com.pe`,
        })
    );

    const total = customers.length;
    const totalPages = Math.ceil(total / sizePage);

    return {
      customers: customers.slice(0, sizePage),
      total,
      totalPages,
    };
  }
}
