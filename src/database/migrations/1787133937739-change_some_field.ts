import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeSomeField1787133937739 implements MigrationInterface {
    name = 'ChangeSomeField1787133937739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seats" ADD CONSTRAINT "UQ_28a8756f061b7132f1eecc4ce50" UNIQUE ("hallId", "row", "number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seats" DROP CONSTRAINT "UQ_28a8756f061b7132f1eecc4ce50"`);
    }

}
