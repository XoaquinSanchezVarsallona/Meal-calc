import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GarminService } from './garmin.service';
import * as path from 'path';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly garminService: GarminService) {}

  /**
   * Carga y procesa un archivo .fit enviado por el usuario.
   * POST /activities/fit/upload
   */
  @Post('fit/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFitFile(@UploadedFile() file: any) {
    if (!file) {
      return {
        success: false,
        message: 'No se subió ningún archivo',
      };
    }

    if (path.extname(file.originalname).toLowerCase() !== '.fit') {
      return {
        success: false,
        message: 'El archivo debe ser de tipo .fit de Garmin',
      };
    }

    const activityData = await this.garminService.parseFitBuffer(file.buffer);

    if (activityData == null) {
      return {
        success: false,
        message: 'No se pudo leer el archivo FIT. Revisa que el archivo esté completo y sea válido.',
      };
    }

    return {
      success: true,
      fileName: file.originalname,
      summary: this.garminService.getActivitySummary(activityData),
      rawData: activityData,
    };
  }

  /**
   * Procesa un archivo .fit desde una ruta local
   * POST /activities/fit/process
   */
  @Post('fit/process')
  async processFitFile(@Body('filePath') filePath: string) {
    const activityData = await this.garminService.parseFitFile(filePath);

    if (activityData == null) {
      return {
        success: false,
        message: 'No se pudo leer el archivo FIT.',
      };
    }

    return {
      success: true,
      filePath,
      summary: this.garminService.getActivitySummary(activityData),
    };
  }

  /**
   * Extrae información calórica de un archivo .fit subido.
   * POST /activities/fit/calories
   */
  @Post('fit/calories')
  @UseInterceptors(FileInterceptor('file'))
  async extractCaloriesFromFit(@UploadedFile() file: any) {
    if (!file) {
      return {
        success: false,
        message: 'No se subió ningún archivo',
      };
    }

    if (path.extname(file.originalname).toLowerCase() !== '.fit') {
      return {
        success: false,
        message: 'El archivo debe ser de tipo .fit',
      };
    }

    const calorieData = await this.garminService.analyzeFitBufferForCalories(
      file.buffer,
    );

    if (calorieData == null) {
      return {
        success: false,
        message: 'No se pudo extraer información del archivo FIT.',
      };
    }

    return {
      success: true,
      calories: calorieData,
    };
  }
}
