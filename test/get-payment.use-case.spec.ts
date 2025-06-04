import {GetPaymentUseCase} from "../src/modules/payment/application/use-cases/get-payment.use-case";
import {Payment} from "../src/modules/payment/domain/entities/transaction.entity";

describe('GetPaymentUseCase', () => {
    let useCase: GetPaymentUseCase;
    let repo: any;

    beforeEach(() => {
        repo = {
            save: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
        };
        useCase = new GetPaymentUseCase(repo);
    });

    it('should return payment if found', async () => {
        const payment = new Payment('GETID', 'ORD891', 1200);
        repo.findById.mockResolvedValue(payment);

        const result = await useCase.execute('GETID');

        expect(result).toBe(payment);
    });

    it('should throw if payment not found', async () => {
        repo.findById.mockResolvedValue(null);
        await expect(useCase.execute('XXX')).rejects.toThrow('Payment not found');
    });
});