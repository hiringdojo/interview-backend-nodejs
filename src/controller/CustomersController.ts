import { APIGatewayProxyEvent } from 'aws-lambda';
import { Customer } from '../domain/Customer';
import { CustomersService } from '../service/CustomersService';

export class CustomersController {
  constructor(private service: CustomersService) {}

  async findByFilter(event: APIGatewayProxyEvent) {
    if (JSON.stringify(event.queryStringParameters) === '{}') {
      return this.apiResponseBadRequestError();
    }

    const { name, lastName } =
      event.queryStringParameters as unknown as Customer;

    return this.apiResponseOk(
      await this.service.findByFilter(new Customer({ name, lastName }))
    );
  }

  apiResponseBadRequestError() {
    return {
      statusCode: 400,
      isBase64Encoded: false,
    };
  }

  apiResponseOk(customers: Customer[]) {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify(customers),
    };
  }
}
