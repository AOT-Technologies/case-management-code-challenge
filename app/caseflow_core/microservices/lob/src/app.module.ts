import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

//Custom - imports //

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaseflowLobModule } from './caseflow_lob/caseflow_lob.module';
import { CaseflowContactsModule } from './caseflow_contacts/caseflow_contacts.module';
import { CaseflowIndividualsModule } from './caseflow_individuals/caseflow_individuals.module';

const keyCloakOptionsProvider = {
  provide: 'keyCloakDataProvider',
  useFactory: (config: ConfigService) => {
    return {
      authServerUrl: config.get('KEYCLOCK_AUTH_URL'),
      realm: config.get('KEYCLOCK_REALM'),
      clientId: config.get('KEYCLOCK_CLIENT_ID'),
      secret: config.get('KEYCLOCK_SECRET'),
    };
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KeycloakConnectModule.registerAsync(keyCloakOptionsProvider),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: config.get('POSTGRESQL_HOST'),
        port: parseInt(config.get('POSTGRESQL_PORT')),
        database: config.get('POSTGRES_DATABASE'),
        username: config.get('POSTGRES_DB_USERNAME'),
        password: config.get('POSTGRES_DB_PASSWORD'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['./src/migrations/*.ts'],
      }),
    }),
    CaseflowLobModule,
    CaseflowContactsModule,
    CaseflowIndividualsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
