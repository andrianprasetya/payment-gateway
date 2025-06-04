import {MarkAsPaidUseCase} from "../src/modules/payment/application/use-cases/mark-as-paid.use-case";
import {PaymentRepository} from "../src/modules/payment/domain/repositories/payment.repository";
import {Payment} from "../src/modules/payment/domain/entities/transaction.entity";

describe('MarkAsPaidUseCase', () => {
    let useCase: MarkAsPaidUseCase;
    let repo: any;

    beforeEach(() => {
        repo = {
            save: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
        };
        useCase = new MarkAsPaidUseCase(repo);
    });

    it('should mark payment as PAID', async () => {
        const payment = new Payment('PAYID', 'ORD123', 500);
        repo.findById.mockResolvedValue(payment);

        const result = await useCase.execute('PAYID');

        expect(result.status).toBe('PAID');
        expect(repo.save).toHaveBeenCalledWith(payment);
    });

    it('should throw if payment not found', async () => {
        repo.findById.mockResolvedValue(null);
        await expect(useCase.execute('NOTEXIST')).rejects.toThrow('Payment not found');
    });
});