import axios from 'axios';
import { Customer } from '../domain/Customer';
import { CustomersRepository } from './CustomersRepository';

type RandomUser = {
  id: {
    value: string;
  };
  name: {
    first: string;

    last: string;
  };
};

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    if (!result.data.results) {
      return [];
    }

    const results: Customer[] = result.data.results
      .filter(
        (item: RandomUser) =>
          (!customer.name ||
            item.name.first
              .toLowerCase()
              .includes(customer.name.toLowerCase())) &&
          (!customer.lastName ||
            item.name.last
              .toLowerCase()
              .includes(customer.lastName.toLowerCase()))
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
          })
      );
    return results.length > 0 ? results : [];
  }
}
