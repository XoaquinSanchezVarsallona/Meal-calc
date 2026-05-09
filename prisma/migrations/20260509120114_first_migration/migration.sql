-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('MAINTAIN', 'GAIN_MUSCLE', 'LOSE_FAT');

-- CreateTable
CREATE TABLE "Meal" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "height_cm" DOUBLE PRECISION NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "preferences" TEXT NOT NULL,
    "goal" "Goal" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCaloricStatus" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight_kg" DOUBLE PRECISION NOT NULL,
    "caloricIntake" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "UserCaloricStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMeal" (
    "user_id" UUID NOT NULL,
    "meal_id" UUID NOT NULL,

    CONSTRAINT "UserMeal_pkey" PRIMARY KEY ("user_id","meal_id")
);

-- CreateTable
CREATE TABLE "UserIngredient" (
    "user_id" UUID NOT NULL,
    "ingredient_id" UUID NOT NULL,
    "quantity_kg" DOUBLE PRECISION,

    CONSTRAINT "UserIngredient_pkey" PRIMARY KEY ("user_id","ingredient_id")
);

-- CreateTable
CREATE TABLE "MealIngredient" (
    "meal_id" UUID NOT NULL,
    "ingredient_id" UUID NOT NULL,
    "quantity_kg" DOUBLE PRECISION,

    CONSTRAINT "MealIngredient_pkey" PRIMARY KEY ("meal_id","ingredient_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Activity_user_id_idx" ON "Activity"("user_id");

-- CreateIndex
CREATE INDEX "UserCaloricStatus_user_id_idx" ON "UserCaloricStatus"("user_id");

-- CreateIndex
CREATE INDEX "UserMeal_meal_id_idx" ON "UserMeal"("meal_id");

-- CreateIndex
CREATE INDEX "UserIngredient_ingredient_id_idx" ON "UserIngredient"("ingredient_id");

-- CreateIndex
CREATE INDEX "MealIngredient_ingredient_id_idx" ON "MealIngredient"("ingredient_id");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCaloricStatus" ADD CONSTRAINT "UserCaloricStatus_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMeal" ADD CONSTRAINT "UserMeal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMeal" ADD CONSTRAINT "UserMeal_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIngredient" ADD CONSTRAINT "UserIngredient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIngredient" ADD CONSTRAINT "UserIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealIngredient" ADD CONSTRAINT "MealIngredient_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealIngredient" ADD CONSTRAINT "MealIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
