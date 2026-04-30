import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { CaloriesModule } from './calories/calories.module';
import { UserManagmentModule } from './user_managment/user_managment.module';
import { MealsModule } from './meals/meals.module';
import { SecurityModule } from './security/security.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SecurityModule, AiModule, CaloriesModule, UserManagmentModule, MealsModule, ActivitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
