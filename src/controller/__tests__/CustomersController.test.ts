import { APIGatewayProxyEvent } from 'aws-lambda';
import { Customer } from '../../domain/Customer';
import { CustomersService } from '../../service/CustomersService';
import { CustomersController } from '../CustomersController';

describe('CustomersController', () => {
  const service = {
    findByFilter: jest.fn(),
  } as unknown as CustomersService;

  const controller = new CustomersController(service);

  describe('findByFilter', () => {
    it('should return customers', async () => {
      const resultMock = [
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'email',
        },
      ];
      // Prepare
      service.findByFilter = jest.fn().mockResolvedValue(resultMock);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: JSON.stringify(resultMock),
      });
      expect(service.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });

    it('Should return customers when filter by some name', async () => {
      const resultMock = [
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'email',
        },
      ];
      // Prepare
      service.findByFilter = jest.fn().mockResolvedValue(resultMock);

      // Execute
      const customerFilter = {
        name: 'n',
      };
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: customerFilter.name,
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: JSON.stringify(resultMock),
      });
      expect(service.findByFilter).toBeCalledWith({
        name: customerFilter.name,
      });
    });

    it('Should return customers when filter by some lastname', async () => {
      const resultMock = [
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'email',
        },
      ];
      // Prepare
      service.findByFilter = jest.fn().mockResolvedValue(resultMock);

      // Execute
      const customerFilter = {
        lastName: 'last',
      };
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          lastName: customerFilter.lastName,
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: JSON.stringify(resultMock),
      });
      expect(service.findByFilter).toBeCalledWith({
        lastName: customerFilter.lastName,
      });
    });

    it('ShouldShould return customers when filter by some lastname and name', async () => {
      const resultMock = [
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'email',
        },
      ];
      // Prepare
      service.findByFilter = jest.fn().mockResolvedValue(resultMock);

      // Execute
      const customerFilter = {
        lastName: 'last',
        name: 'name',
      };
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          lastName: customerFilter.lastName,
          name: customerFilter.name,
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: JSON.stringify(resultMock),
      });
      expect(service.findByFilter).toBeCalledWith({
        lastName: customerFilter.lastName,
        name: customerFilter.name,
      });
    });

    it('Should return empty when there are no coincidences with the filter', async () => {
      const resultMock: Customer[] = [];
      // Prepare
      service.findByFilter = jest.fn().mockResolvedValue(resultMock);

      // Execute
      const customerFilter = {
        lastName: 'last',
        name: 'name',
      };
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          lastName: customerFilter.lastName,
          name: customerFilter.name,
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 200,
        isBase64Encoded: false,
        body: JSON.stringify(resultMock),
      });
      expect(service.findByFilter).toBeCalledWith({
        lastName: customerFilter.lastName,
        name: customerFilter.name,
      });
    });

    it('Should return a status code 400 when no parameter is sent', async () => {
      const customerFilter = {};
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: customerFilter,
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual({
        statusCode: 400,
        isBase64Encoded: false,
      });
    });
  });
});
