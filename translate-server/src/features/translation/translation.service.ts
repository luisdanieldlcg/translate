import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { translationApiConfig } from 'src/config/translation-api.config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface ITranslation {
  from: string;
  to: string;
  text: string;
}

interface Translation {
  detected_language: string;
  translated: string;
  original_text: string;
}

@Injectable()
export class TranslationService {
  private readonly logger: Logger = new Logger(TranslationService.name);
  constructor(
    @Inject(translationApiConfig.KEY)
    private readonly config: ConfigType<typeof translationApiConfig>,
    private readonly httpService: HttpService,
  ) {}

  async translate(translation: ITranslation): Promise<Translation> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://google-api31.p.rapidapi.com/translate',
          {
            from_lang: translation.from,
            to: translation.to,
            text: translation.text,
          },
          {
            headers: {
              'x-rapidapi-key':
                'f3adeed93fmsha7feeffe69ccbbap13db1cjsn6d9bb9a8241b',
              'x-rapidapi-host': 'google-api31.p.rapidapi.com',
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      this.logger.log(response.data);
      const data = response.data as Translation[];
      return data[0];
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
