import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { FarmerModule } from "./modules/farmer/farmer.module"
import { CropModule } from "./modules/crop/crop.module"
import { ProgramModule } from "./modules/program/program.module"
import { LandParcelModule } from "./modules/landparcel/landparcel.module"
import { DataPrivacyModule } from "./modules/dataprivacy/dataprivacy.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FarmerModule, CropModule, ProgramModule, LandParcelModule, DataPrivacyModule,
  ],
})
export class AppModule {}