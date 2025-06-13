import axios from 'axios';
import { Customer } from '../../domain/Customer';
import { CustomersRepositoryImpl } from '../CustomersRepositoryImpl';
import { customerRepositoryMock } from '../mocks/CustomerRepository.mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CustomersRepositoryImpl', () => {
  const repository = new CustomersRepositoryImpl();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findByFilter', () => {
    it('should return customers from random user', async () => {
      // Prepare
      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve(customerRepositoryMock)
      );

      // Execute
      const response = await repository.findByFilter(
        new Customer({
          name: 'B',
        })
      );

      // Validate
      expect(response).toEqual([
        {
          id: '0390511T',
          name: 'brad',
          lastName: 'gibson',
        },
      ]);
    });

    it('Should return customers when filter by some name', async () => {
      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve(customerRepositoryMock)
      );

      const response = await repository.findByFilter(
        new Customer({
          name: 'br',
        })
      );

      expect(response).toEqual([
        {
          id: '0390511T',
          name: 'brad',
          lastName: 'gibson',
        },
      ]);
    });

    it('Should return customers when filter by some lastname', async () => {
      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve(customerRepositoryMock)
      );

      const response = await repository.findByFilter(
        new Customer({
          lastName: 'gib',
        })
      );

      expect(response).toEqual([
        {
          id: '0390511T',
          name: 'brad',
          lastName: 'gibson',
        },
      ]);
    });

    it('Should return customers when filter by some lastname and name', async () => {
      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve(customerRepositoryMock)
      );

      const response = await repository.findByFilter(
        new Customer({
          lastName: 'gib',
          name: 'br',
        })
      );

      expect(response).toEqual([
        {
          id: '0390511T',
          name: 'brad',
          lastName: 'gibson',
        },
      ]);
    });

    it('Should return empty when there are no coincidences with the filter', async () => {
      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve(customerRepositoryMock)
      );

      const response = await repository.findByFilter(
        new Customer({
          lastName: 'xxx',
          name: 'xxx',
        })
      );

      expect(response).toEqual([]);
    });
  });
});
