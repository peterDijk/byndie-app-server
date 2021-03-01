import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatedUser1614637565797 implements MigrationInterface {
    name = 'UpdatedUser1614637565797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_4aa0d9a52c36ff93415934e2d2b"`);
        await queryRunner.query(`ALTER TABLE "cities" RENAME COLUMN "country_id" TO "city_country_id"`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_84e7e25d31eef03fc4824bc6da3" FOREIGN KEY ("city_country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_84e7e25d31eef03fc4824bc6da3"`);
        await queryRunner.query(`ALTER TABLE "cities" RENAME COLUMN "city_country_id" TO "country_id"`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_4aa0d9a52c36ff93415934e2d2b" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
