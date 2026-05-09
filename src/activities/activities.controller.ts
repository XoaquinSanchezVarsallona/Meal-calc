import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GarminService } from './garmin.service';
import * as path from 'path';
import { ActivityLoaderService } from './activityLoader.service';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';
import {
  CurrentUser,
  type CurrentUser as CurrentUserData,
} from 'src/security/decorators/current-user.decorator';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
  constructor(
    private readonly garminService: GarminService,
    private readonly activityLoaderService: ActivityLoaderService,
  ) {}

  /**
   * Carga y procesa un archivo .fit enviado por el usuario.
   * POST /activities/fit/upload
   */
  @Post('fit/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFitFile(
    @UploadedFile() file: any,
    @CurrentUser() user: CurrentUserData,
  ) {
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
        message:
          'No se pudo leer el archivo FIT. Revisa que el archivo esté completo y sea válido.',
      };
    }
    const summary = this.garminService.getActivitySummary(activityData);
    const activity = await this.activityLoaderService.saveActivity({
      name: summary.sport,
      calories: summary.totalCalories,
      user_id: user.userId,
    });

    return {
      success: true,
      fileName: file.originalname,
      summary: summary,
      activityId: activity.id,
    };
  }

  /**
   * Procesa un archivo .fit desde una ruta local
   * POST /activities/fit/process
   */
  @Post('fit/process')
  async processFitFile(
    @Body('filePath') filePath: string,
    @CurrentUser() user: CurrentUserData,
  ) {
    const activityData = await this.garminService.parseFitFile(filePath);

    if (activityData == null) {
      return {
        success: false,
        message: 'No se pudo leer el archivo FIT.',
      };
    }
    const summary = this.garminService.getActivitySummary(activityData);
    const activity = await this.activityLoaderService.saveActivity({
      name: summary.subSport ? summary.subSport : (summary.sport ? summary.sport : 'Actividad desconocida'),
      calories: summary.totalCalories,
      user_id: user.userId,
    });


    return {
      success: true,
      filePath,
      userId: user.userId,
      summary: activity,
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
