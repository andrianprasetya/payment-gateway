import {Module} from "@nestjs/common";
import { CommandModule as NestjsCommandModule } from 'nestjs-command';
import {RegisterClientCommand} from "./register-merchant.command";
import {AuthModule} from "../auth/oauth.module";


@Module({
    imports: [
        NestjsCommandModule,
        AuthModule,
    ],
    providers: [RegisterClientCommand]
})

export class CommandModule {}