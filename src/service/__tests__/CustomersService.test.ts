import { Customer } from '../../domain/Customer';
import { CustomersRepository } from '../../repository/CustomersRepository';
import { CustomersServiceImpl } from '../CustomersServiceImpl';

describe('CustomersServiceImpl', () => {
  const repository = {
    findByFilter: jest.fn(),
  } as unknown as CustomersRepository;

  const service = new CustomersServiceImpl(repository);

  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      repository.findByFilter = jest.fn().mockResolvedValue([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
        },
      ]);

      // Execute
      const response = await service.findByFilter(new Customer({ name: 'A' }));

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });

    it('Should return customers when filter by some name', async () => {
      // Prepare
      repository.findByFilter = jest.fn().mockResolvedValue([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
        },
      ]);

      const customerFilter = new Customer({ name: 'n' });
      // Execute
      const response = await service.findByFilter(customerFilter);

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);

      expect(repository.findByFilter).toBeCalledWith({
        name: customerFilter.name,
      });
    });

    it('Should return customers when filter by some lastname', async () => {
      // Prepare
      repository.findByFilter = jest.fn().mockResolvedValue([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
        },
      ]);

      const customerFilter = new Customer({ lastName: 'last' });
      // Execute
      const response = await service.findByFilter(customerFilter);

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);

      expect(repository.findByFilter).toBeCalledWith({
        lastName: customerFilter.lastName,
      });
    });

    it('Should return customers when filter by some lastname and name', async () => {
      // Prepare
      repository.findByFilter = jest.fn().mockResolvedValue([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
        },
      ]);

      const customerFilter = new Customer({ lastName: 'last', name: 'n' });
      // Execute
      const response = await service.findByFilter(customerFilter);

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);

      expect(repository.findByFilter).toBeCalledWith({
        lastName: customerFilter.lastName,
        name: customerFilter.name,
      });
    });

    it('Should return empty when there are no coincidences with the filter', async () => {
      // Prepare
      repository.findByFilter = jest.fn().mockResolvedValue([]);

      const customerFilter = new Customer({ lastName: 'last', name: 'n' });
      // Execute
      const response = await service.findByFilter(customerFilter);

      // Validate
      expect(response).toEqual([]);

      expect(repository.findByFilter).toBeCalledWith({
        lastName: customerFilter.lastName,
        name: customerFilter.name,
      });
    });
  });
});
