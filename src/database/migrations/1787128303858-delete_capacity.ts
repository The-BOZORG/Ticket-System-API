import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCapacity1787128303858 implements MigrationInterface {
    name = 'DeleteCapacity1787128303858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "halls" DROP COLUMN "capacity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "halls" ADD "capacity" integer NOT NULL`);
    }

}
