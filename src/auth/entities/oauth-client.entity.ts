import {v4 as uuid} from "uuid";

export class OauthClientEntity {
    public readonly id: string;
    public client_id: string;
    public client_secret: string;
    public email: string;
    public name: string;
    public is_active: number | null;
    public scopes: string | null;
    public callback_url: string;
    public readonly created_at: Date;
    public readonly updated_at: Date;

    constructor(props: {
        id?: string;
        client_id: string;
        client_secret: string;
        email: string
        name: string;
        is_active?: number | null;
        scopes?: string | null;
        callback_url: string;
        created_at?: Date;
        updated_at?: Date;
    }) {
        this.id = props.id ?? uuid()
        this.client_id = props.client_id;
        this.client_secret = props.client_secret;
        this.name = props.name;
        this.email = props.email;
        this.is_active = props.is_active ?? null;
        this.scopes = props.scopes ?? null;
        this.callback_url = props.callback_url;
        this.created_at = props.created_at ?? new Date();
        this.updated_at = props.updated_at ?? new Date();
    }
}