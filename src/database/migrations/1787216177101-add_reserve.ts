import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReserve1787216177101 implements MigrationInterface {
    name = 'AddReserve1787216177101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reserves_status_enum" AS ENUM('PENDING', 'PAID', 'CANCELLED', 'EXPIRED')`);
        await queryRunner.query(`CREATE TABLE "reserves" ("id" SERIAL NOT NULL, "totalPrice" numeric(10,2) NOT NULL, "status" "public"."reserves_status_enum" NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "showtime_id" integer NOT NULL, CONSTRAINT "PK_e38489955a3c1a3880737f466ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reserve_seats" ("id" SERIAL NOT NULL, "reserve_id" integer NOT NULL, "seat_id" integer NOT NULL, CONSTRAINT "PK_0e0590ad10549697fba7200937b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reserves" ADD CONSTRAINT "FK_55dff1b46f571331b36bae5f119" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserves" ADD CONSTRAINT "FK_d6ce3859e3d056c66007b55fc9c" FOREIGN KEY ("showtime_id") REFERENCES "showtimes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserve_seats" ADD CONSTRAINT "FK_cd25b70df742b89dc53d6d4cc37" FOREIGN KEY ("reserve_id") REFERENCES "reserves"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserve_seats" ADD CONSTRAINT "FK_9b6f546e0a976c64e62ed8c0854" FOREIGN KEY ("seat_id") REFERENCES "seats"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserve_seats" DROP CONSTRAINT "FK_9b6f546e0a976c64e62ed8c0854"`);
        await queryRunner.query(`ALTER TABLE "reserve_seats" DROP CONSTRAINT "FK_cd25b70df742b89dc53d6d4cc37"`);
        await queryRunner.query(`ALTER TABLE "reserves" DROP CONSTRAINT "FK_d6ce3859e3d056c66007b55fc9c"`);
        await queryRunner.query(`ALTER TABLE "reserves" DROP CONSTRAINT "FK_55dff1b46f571331b36bae5f119"`);
        await queryRunner.query(`DROP TABLE "reserve_seats"`);
        await queryRunner.query(`DROP TABLE "reserves"`);
        await queryRunner.query(`DROP TYPE "public"."reserves_status_enum"`);
    }

}
