import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1787385609950 implements MigrationInterface {
  name = 'Init1787385609950';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "ticketNumber" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_e99bd0f51b92896fdaf99ebb715" UNIQUE ("ticketNumber"), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(96) NOT NULL, "email" character varying(96) NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "isVerified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" SERIAL NOT NULL, "title" character varying(150) NOT NULL, "description" text NOT NULL, "duration" integer NOT NULL, "genre" character varying(50) NOT NULL, "releaseDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "showtimes" ("id" SERIAL NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "movie_id" integer NOT NULL, "hall_id" integer NOT NULL, CONSTRAINT "PK_2d979092e692ec1a7b505893ee2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."reserves_status_enum" AS ENUM('PENDING', 'PAID', 'CANCELLED', 'EXPIRED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "reserves" ("id" SERIAL NOT NULL, "totalPrice" numeric(10,2) NOT NULL, "status" "public"."reserves_status_enum" NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "showtime_id" integer NOT NULL, CONSTRAINT "PK_e38489955a3c1a3880737f466ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reserve_seats" ("id" SERIAL NOT NULL, "reserve_id" integer NOT NULL, "seat_id" integer NOT NULL, CONSTRAINT "PK_0e0590ad10549697fba7200937b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "seats" ("id" SERIAL NOT NULL, "row" character varying(10) NOT NULL, "number" integer NOT NULL, "hallId" integer NOT NULL, CONSTRAINT "UQ_28a8756f061b7132f1eecc4ce50" UNIQUE ("hallId", "row", "number"), CONSTRAINT "PK_3fbc74bb4638600c506dcb777a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "halls" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "cinemaId" integer NOT NULL, CONSTRAINT "PK_4665c2f3b1e718e12b06278bae8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cinemas" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "address" character varying(255) NOT NULL, CONSTRAINT "PK_5c49a5f87710ce93fad49d72320" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_4bb45e096f521845765f657f5c8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "showtimes" ADD CONSTRAINT "FK_cbe689b0c116fbc866d8ea21759" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "showtimes" ADD CONSTRAINT "FK_d90444306cb1cfdc01d9e163537" FOREIGN KEY ("hall_id") REFERENCES "halls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserves" ADD CONSTRAINT "FK_55dff1b46f571331b36bae5f119" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserves" ADD CONSTRAINT "FK_d6ce3859e3d056c66007b55fc9c" FOREIGN KEY ("showtime_id") REFERENCES "showtimes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserve_seats" ADD CONSTRAINT "FK_cd25b70df742b89dc53d6d4cc37" FOREIGN KEY ("reserve_id") REFERENCES "reserves"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserve_seats" ADD CONSTRAINT "FK_9b6f546e0a976c64e62ed8c0854" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seats" ADD CONSTRAINT "FK_81d1647b12c00bb1bf48ced7136" FOREIGN KEY ("hallId") REFERENCES "halls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "halls" ADD CONSTRAINT "FK_5b95ec1a2b0b4f46e7bc906f6c2" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "halls" DROP CONSTRAINT "FK_5b95ec1a2b0b4f46e7bc906f6c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seats" DROP CONSTRAINT "FK_81d1647b12c00bb1bf48ced7136"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserve_seats" DROP CONSTRAINT "FK_9b6f546e0a976c64e62ed8c0854"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserve_seats" DROP CONSTRAINT "FK_cd25b70df742b89dc53d6d4cc37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserves" DROP CONSTRAINT "FK_d6ce3859e3d056c66007b55fc9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserves" DROP CONSTRAINT "FK_55dff1b46f571331b36bae5f119"`,
    );
    await queryRunner.query(
      `ALTER TABLE "showtimes" DROP CONSTRAINT "FK_d90444306cb1cfdc01d9e163537"`,
    );
    await queryRunner.query(
      `ALTER TABLE "showtimes" DROP CONSTRAINT "FK_cbe689b0c116fbc866d8ea21759"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "FK_4bb45e096f521845765f657f5c8"`,
    );
    await queryRunner.query(`DROP TABLE "cinemas"`);
    await queryRunner.query(`DROP TABLE "halls"`);
    await queryRunner.query(`DROP TABLE "seats"`);
    await queryRunner.query(`DROP TABLE "reserve_seats"`);
    await queryRunner.query(`DROP TABLE "reserves"`);
    await queryRunner.query(`DROP TYPE "public"."reserves_status_enum"`);
    await queryRunner.query(`DROP TABLE "showtimes"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "tickets"`);
  }
}
