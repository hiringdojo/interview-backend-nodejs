import axios from 'axios';
import { CustomersRepository } from './CustomersRepository';
import { Customer } from '../domain/Customer';

type RandomUser = {
  id: {
    value: string;
  };
  name: {
    first: string;

    last: string;
  };
  gender: string;
};

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    if (!result.data.results) {
      return [];
    }

    return result.data.results
      .filter(
        (item: RandomUser) =>
          (customer.name
            ? item.name.first
                .toLowerCase()
                .startsWith(customer.name.toLowerCase())
            : true) &&
          (customer.lastName
            ? item.name.last
                .toLowerCase()
                .startsWith(customer.lastName.toLowerCase())
            : true) &&
          (customer.gender
            ? item.gender.toLowerCase() === customer.gender
            : true)
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
            gender: item.gender,
          })
      );
  }
}
