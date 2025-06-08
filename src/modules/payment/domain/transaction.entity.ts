import {v4 as uuid} from "uuid";
import {UserStatus} from "../infrastructure/transaction.entity.orm";

export class Transaction {
    public readonly id: string;
    public readonly created_at: Date;
    public readonly updated_at: Date;

    constructor(props: {
        id?: string;
        client_id: string;
        amount: number;
        currency: string;
        payment_method: string;
        status: string;
        external_ref: string;
        callback_sent: boolean;
        created_at?: Date;
        updated_at?: Date;
    }) {
        this.id = props.id ?? uuid();
        this.client_id = props.client_id;
        this.amount = props.amount;
        this.currency = props.currency;
        this.payment_method = props.payment_method;
        this.status = props.status;
        this.external_ref = props.external_ref;
        this.callback_sent = props.callback_sent;
        this.created_at = props.created_at ?? new Date();
        this.updated_at = props.updated_at ?? new Date();
    }

    public client_id: string;
    public amount: number;
    public currency: string;
    public payment_method: string;
    public status: string;
    public external_ref: string;
    public callback_sent: boolean;

    marAsCreated(){
        this.status = UserStatus.CREATED
    }

    marAsPaid(){
        this.status = UserStatus.PAID
    }
    marAsProcessing(){
        this.status = UserStatus.PROCESSING
    }
    marAsFailed(){
        this.status = UserStatus.FAILED
    }
}
