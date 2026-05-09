import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Decoder, Stream } from '@garmin/fitsdk';
import { readFile } from 'fs/promises';

export interface FitActivityData {
  activityName?: string;
  startTime?: Date;
  endTime?: Date;
  sport?: string;
  subSport?: string;
  totalCalories?: number;
  totalDistance?: number;
  totalElapsedTime?: number;
  avgHeartRate?: number;
  maxHeartRate?: number;
  avgCadence?: number;
  maxCadence?: number;
  avgSpeed?: number;
  maxSpeed?: number;
  records: FitRecordData[];
}

export interface FitRecordData {
  timestamp?: Date;
  distance?: number;
  heartRate?: number;
  cadence?: number;
  speed?: number;
  altitude?: number;
  power?: number;
}

@Injectable()
export class GarminService implements OnModuleDestroy {
  private readonly logger = new Logger(GarminService.name);

  onModuleDestroy() {
    this.logger.log('GarminService destroyed');
  }

  async parseFitFile(filePath: string): Promise<FitActivityData | null> {
    try {
      const buffer = await readFile(filePath);
      return await this.parseFitBuffer(buffer);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error al leer archivo .fit: ${message}`);
      return null;
    }
  }

  async parseFitBuffer(buffer: Buffer): Promise<FitActivityData | null> {
    try {
      const stream = Stream.fromBuffer(buffer);
      const decoder = new Decoder(stream);
      const result = decoder.read();

      if (result.errors.length > 0) {
        this.logger.error(`El archivo FIT no se pudo decodificar: ${String(result.errors[0])}`);
        return null;
      }

      return this.extractActivityData(result.messages as Record<string, any[]>);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error al parsear buffer .fit: ${message}`);
      return null;
    }
  }

  async analyzeFitFileForCalories(filePath: string) {
    const activityData = await this.parseFitFile(filePath);
    if (activityData == null) {
      return null;
    }

    return {
      totalCalories: activityData.totalCalories || 0,
      sport: activityData.sport,
      subSport: activityData.subSport,
      startTime: activityData.startTime,
      endTime: activityData.endTime,
      totalDistance: activityData.totalDistance,
      totalElapsedTime: activityData.totalElapsedTime,
      avgHeartRate: activityData.avgHeartRate,
      recordCount: activityData.records.length,
    };
  }

  async analyzeFitBufferForCalories(buffer: Buffer) {
    const activityData = await this.parseFitBuffer(buffer);
    if (activityData == null) {
      return null;
    }

    return {
      totalCalories: activityData.totalCalories || 0,
      sport: activityData.sport,
      subSport: activityData.subSport,
      startTime: activityData.startTime,
      endTime: activityData.endTime,
      totalDistance: activityData.totalDistance,
      totalElapsedTime: activityData.totalElapsedTime,
      avgHeartRate: activityData.avgHeartRate,
      recordCount: activityData.records.length,
    };
  }

  getActivitySummary(activityData: FitActivityData) {
    return {
      sport: activityData.sport,
      subSport: activityData.subSport,
      startTime: activityData.startTime,
      endTime: activityData.endTime,
      totalCalories: activityData.totalCalories || 0,
      totalDistanceKm: activityData.totalDistance != null ? activityData.totalDistance / 1000 : 0,
      totalElapsedTimeSeconds: activityData.totalElapsedTime || 0,
      avgHeartRate: activityData.avgHeartRate,
      maxHeartRate: activityData.maxHeartRate,
      avgCadence: activityData.avgCadence,
      maxCadence: activityData.maxCadence,
      avgSpeed: activityData.avgSpeed,
      maxSpeed: activityData.maxSpeed,
      recordCount: activityData.records.length,
    };
  }

  private extractActivityData(fitMessages: Record<string, any[]>): FitActivityData {
    const activityData: FitActivityData = {
      records: [],
    };

    const fileIdMessage = fitMessages.fileIdMesgs?.[0];
    const sessionMessage = fitMessages.sessionMesgs?.[0];
    const lapMessage = fitMessages.lapMesgs?.[0];

    if (fileIdMessage != null) {
      activityData.activityName = fileIdMessage.product ?? fileIdMessage.manufacturer ?? fileIdMessage.productName;
    }

    if (sessionMessage != null) {
      activityData.sport = sessionMessage.sport;
      activityData.subSport = sessionMessage.subSport ?? sessionMessage.sub_sport;
      activityData.startTime = sessionMessage.startTime ?? sessionMessage.start_time;
      activityData.totalCalories = sessionMessage.totalCalories ?? sessionMessage.total_calories;
      activityData.totalDistance = sessionMessage.totalDistance ?? sessionMessage.total_distance;
      activityData.totalElapsedTime = sessionMessage.totalElapsedTime ?? sessionMessage.total_elapsed_time;
      activityData.avgHeartRate = sessionMessage.avgHeartRate ?? sessionMessage.avg_heart_rate;
      activityData.maxHeartRate = sessionMessage.maxHeartRate ?? sessionMessage.max_heart_rate;
      activityData.avgCadence = sessionMessage.avgCadence ?? sessionMessage.avg_cadence;
      activityData.maxCadence = sessionMessage.maxCadence ?? sessionMessage.max_cadence;
      activityData.avgSpeed = sessionMessage.avgSpeed ?? sessionMessage.avg_speed;
      activityData.maxSpeed = sessionMessage.maxSpeed ?? sessionMessage.max_speed;
      activityData.endTime = sessionMessage.timestamp ?? sessionMessage.endTime;
    }

    if (lapMessage != null && activityData.endTime == null) {
      activityData.endTime = lapMessage.timestamp;
    }

    for (const recordMessage of fitMessages.recordMesgs ?? []) {
      const record: FitRecordData = {
        timestamp: recordMessage.timestamp,
        distance: recordMessage.distance,
        heartRate: recordMessage.heartRate ?? recordMessage.heart_rate,
        cadence: recordMessage.cadence,
        speed: recordMessage.speed,
        altitude: recordMessage.altitude,
        power: recordMessage.power,
      };
      activityData.records.push(record);
    }

    this.logger.debug(`Archivo .fit procesado: ${activityData.records.length} registros extraídos`);
    return activityData;
  }
}