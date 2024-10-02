import { Get, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule } from './clients/clients.module';
import { ProvidersModule } from './providers/providers.module';
import { ProviderServiceModule } from './provider-service/provider-service.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [AuthModule, PrismaModule, ClientsModule, ProvidersModule, ProviderServiceModule, AppointmentModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {

  @Get('') // Define a rota GET /hello
  getHello(): string {
    return 'Hello World!';
  }

}
