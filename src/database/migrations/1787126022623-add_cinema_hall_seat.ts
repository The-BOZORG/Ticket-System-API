import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCinemaHallSeat1787126022623 implements MigrationInterface {
    name = 'AddCinemaHallSeat1787126022623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seats" ("id" SERIAL NOT NULL, "row" character varying(10) NOT NULL, "number" integer NOT NULL, "hallId" integer NOT NULL, CONSTRAINT "PK_3fbc74bb4638600c506dcb777a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "halls" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "capacity" integer NOT NULL, "cinemaId" integer NOT NULL, CONSTRAINT "PK_4665c2f3b1e718e12b06278bae8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cinemas" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "address" character varying(255) NOT NULL, CONSTRAINT "PK_5c49a5f87710ce93fad49d72320" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "seats" ADD CONSTRAINT "FK_81d1647b12c00bb1bf48ced7136" FOREIGN KEY ("hallId") REFERENCES "halls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "halls" ADD CONSTRAINT "FK_5b95ec1a2b0b4f46e7bc906f6c2" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "halls" DROP CONSTRAINT "FK_5b95ec1a2b0b4f46e7bc906f6c2"`);
        await queryRunner.query(`ALTER TABLE "seats" DROP CONSTRAINT "FK_81d1647b12c00bb1bf48ced7136"`);
        await queryRunner.query(`DROP TABLE "cinemas"`);
        await queryRunner.query(`DROP TABLE "halls"`);
        await queryRunner.query(`DROP TABLE "seats"`);
    }

}
