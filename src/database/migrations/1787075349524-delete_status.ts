import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteStatus1787075349524 implements MigrationInterface {
    name = 'DeleteStatus1787075349524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "priority"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ADD "priority" character varying NOT NULL DEFAULT 'MEDIUM'`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "status" character varying NOT NULL DEFAULT 'OPEN'`);
    }

}
