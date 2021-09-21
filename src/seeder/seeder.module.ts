import { Module, OnModuleInit } from '@nestjs/common';
import { CountriesModule } from 'src/countries/countries.module';
import { Seeder } from './seeder';

@Module({
  imports: [CountriesModule],
  providers: [Seeder],
})
export class SeederModule implements OnModuleInit {
  constructor(private readonly seederService: Seeder) {}
  onModuleInit() {
    this.seederService.seed();
  }
}
