import {MigrationInterface, QueryRunner} from "typeorm";

export class LocationStrings1614637673811 implements MigrationInterface {
    name = 'LocationStrings1614637673811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "city" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "country"`);
    }

}
