import { CreatePaymentUseCase } from '../src/modules/payment/application/use-cases/create-payment.use-case';
import { TransactionRepositoryInterface } from '../src/modules/payment/domain/transaction.repository.interface';

describe('CreatePaymentUseCase', () => {
    let useCase: CreatePaymentUseCase;
    let repo: jest.Mocked<TransactionRepositoryInterface>;

    beforeEach(() => {
        repo = {
            save: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
        };
        useCase = new CreatePaymentUseCase(repo);
    });

    it('should create a payment with PENDING status', async () => {
        const dto = { orderId: 'ORD123', amount: 1000 };
        const result = await useCase.execute(dto);

        expect(result).toHaveProperty('id');
        expect(result.orderId).toBe('ORD123');
        expect(result.amount).toBe(1000);
        expect(result.status).toBe('PENDING');
        expect(repo.save).toHaveBeenCalledWith(result);
    });
});