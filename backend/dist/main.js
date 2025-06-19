"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    try {
        const logger = new common_1.Logger('Bootstrap');
        logger.log('Starting NestJS application...');
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'debug', 'log', 'verbose'],
        });
        app.enableCors({
            origin: [
                'https://lean-umber.vercel.app',
                'http://localhost:3000',
            ],
            credentials: true,
        });
        app.setGlobalPrefix('api');
        if (process.env.NODE_ENV === 'production') {
            app.use((req, res, next) => {
                logger.debug(`${req.method} ${req.url}`);
                next();
            });
        }
        const port = process.env.PORT || 3001;
        await app.listen(port);
        logger.log(`✅ Backend is running on: http://localhost:${port}/api`);
        logger.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    }
    catch (error) {
        console.error('❌ Error starting the application:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map