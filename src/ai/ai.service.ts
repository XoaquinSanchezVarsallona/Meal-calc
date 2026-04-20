import { Injectable } from '@nestjs/common';
import type { User } from '../../generated/prisma/client.js';
import { ConfigService } from '@nestjs/config';

type OllamaGenerateResponse = {
  response: string;
  done: boolean;
};

@Injectable()
export class AiService {

  constructor(private readonly configService: ConfigService) {}
 
  private get url(): string {
    return this.configService.get<string>('AI_URL') ?? 'http://localhost:11434';
  }

  private get model(): string {
    return this.configService.get<string>('AI_MODEL') ?? 'qwen2.5:3b';
  }

  async prompt(promptText: string): Promise<string> {
    const res = await fetch(`${this.url}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        prompt: promptText,
        keep_alive: 0,
        stream: false,
      }),
    });

    if (!res.ok) {
      throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as OllamaGenerateResponse;
    return data.response;
  }
}

