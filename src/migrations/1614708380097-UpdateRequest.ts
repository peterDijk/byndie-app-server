import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRequest1614708380097 implements MigrationInterface {
    name = 'UpdateRequest1614708380097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" ADD "declined" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "message" character varying NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "declined"`);
    }

}
