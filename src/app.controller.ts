import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('receber-base64')
  receberBase64(@Body() base64String: string) {
    // Processar o base64 aqui
    console.log(base64String);
    return { mensagem: 'Base64 recebido com sucesso!' };
  }

  @Post('receber-json')
  receberJson(
    @Body()
    json: {
      members: [
        {
          memberNumber: string;
          flags: [
            {
              flag: string;
              value: boolean;
              reasonCode: string;
              description: string;
            },
          ];
        },
      ];
    },
  ) {
    // Processar o base64 aqui
    console.log(json);
    return { mensagem: 'json recebido com sucesso!' };
  }

  @Post('receber-gzip')
  receberGzip(
    @Body()
    json: {
      members: [
        {
          memberNumber: string;
          flags: [
            {
              flag: string;
              value: boolean;
              reasonCode: string;
              description: string;
            },
          ];
        },
      ];
    },
  ) {
    console.log(json);
    return { mensagem: 'gzip recebido com sucesso!' };
  }
}
