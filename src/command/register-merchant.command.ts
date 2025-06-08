import {Injectable} from "@nestjs/common";
import {OauthService} from "../auth/oauth.service";
import {Command, Option} from "nestjs-command";

@Injectable()
export class RegisterClientCommand {
    constructor(private readonly oauthService: OauthService) {
    }

    @Command({
        command: 'register:client',
        describe: 'register a new merchant',
    })
    async execute(
        @Option({name: "name", type: 'string'}) name: string,
        @Option({name: "email", type: 'string'}) email: string,
        @Option({name: "callback_url", type: 'string'}) callback_url: string,
    ) {
        const result = await this.oauthService.registerClient({name, email, callback_url})

        console.log('✅ Client registered:');
        console.log(`Client ID: ${result.client_id}`);
        console.log(`Client Secret: ${result.client_secret}`);
    }
}