import {DeletePaymentUseCase} from "../src/modules/payment/application/use-cases/delete-payment.use-case";
import {PaymentRepository} from "../src/modules/payment/domain/repositories/payment.repository";
import {Payment} from "../src/modules/payment/domain/entities/transaction.entity";

describe('DeletePaymentUseCase', () => {
    let useCase: DeletePaymentUseCase;
    let repo: any;

    beforeEach(() => {
        repo = {
            save: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
        };
        useCase = new DeletePaymentUseCase(repo);
    });

    it('should delete payment if found', async () => {
        const payment = new Payment('DELID', 'ORD567', 900);
        repo.findById.mockResolvedValue(payment);

        await useCase.execute('DELID');

        expect(repo.delete).toHaveBeenCalledWith('DELID');
    });

    it('should throw if payment not found', async () => {
        repo.findById.mockResolvedValue(null);
        await expect(useCase.execute('XXX')).rejects.toThrow('Payment not found');
    });
});