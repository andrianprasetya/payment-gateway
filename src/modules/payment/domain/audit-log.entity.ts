import {v4 as uuid} from "uuid";
import {UserStatus} from "../infrastructure/transaction.entity.orm";

export class AuditLog {
    public readonly id: string;
    public readonly created_at: Date;
    public client_id: string;
    public action: string;
    public ip_address: string;
    public user_agent: string;
    public metadata: string;


    constructor(props: {
        id?: string;
        client_id: string;
        action: string;
        ip_address: string;
        metadata: string;
        user_agent: string;
        created_at?: Date;
        updated_at?: Date;
    }) {
        this.id = props.id ?? uuid();
        this.client_id = props.client_id;
        this.action = props.action;
        this.ip_address = props.ip_address;
        this.metadata = props.metadata;
        this.user_agent = props.user_agent;
        this.created_at = props.created_at ?? new Date();
    }
}
