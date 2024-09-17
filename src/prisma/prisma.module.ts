import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global() // Marca o módulo como global para ser usado em qualquer lugar sem precisar importar explicitamente
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta o PrismaService
})
export class PrismaModule {}
