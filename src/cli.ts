import {AppModule} from "./app.module";
import { CommandModule, CommandService } from 'nestjs-command';
import {NestFactory} from "@nestjs/core";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule, {
        logger: false
    });

    try {
        await app
            .select(CommandModule)
            .get(CommandService)
            .exec();
        await app.close()
    } catch (error) {
        console.error(error);
        await app.close();
        process.exit(1);
    }
}
bootstrap();