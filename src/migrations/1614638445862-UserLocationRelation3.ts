import {MigrationInterface, QueryRunner} from "typeorm";

export class UserLocationRelation31614638445862 implements MigrationInterface {
    name = 'UserLocationRelation31614638445862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "FK_d5c4d2410634e85cbee2e1c8eaf"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "users_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_location_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_357f927174ae1a4b70771f98eef" FOREIGN KEY ("user_location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_357f927174ae1a4b70771f98eef"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_location_id"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "users_id" uuid`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "FK_d5c4d2410634e85cbee2e1c8eaf" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
