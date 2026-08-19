import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableDescription1787119343062 implements MigrationInterface {
    name = 'AddNullableDescription1787119343062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "description" SET NOT NULL`);
    }

}
