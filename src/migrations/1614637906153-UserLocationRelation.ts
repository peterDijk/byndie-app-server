import {MigrationInterface, QueryRunner} from "typeorm";

export class UserLocationRelation1614637906153 implements MigrationInterface {
    name = 'UserLocationRelation1614637906153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "user_location_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_357f927174ae1a4b70771f98eef" FOREIGN KEY ("user_location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_357f927174ae1a4b70771f98eef"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_location_id"`);
    }

}
