import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEvents1614683831499 implements MigrationInterface {
    name = 'UpdateEvents1614683831499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_types" DROP CONSTRAINT "FK_07885ab799195a2f25aee8b6cd1"`);
        await queryRunner.query(`ALTER TABLE "event_types" DROP COLUMN "events_id"`);
        await queryRunner.query(`ALTER TABLE "events" ADD "event_type_id" uuid`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_cca2d7a421ac4b1b24b9996d101" FOREIGN KEY ("event_type_id") REFERENCES "event_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_cca2d7a421ac4b1b24b9996d101"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "event_type_id"`);
        await queryRunner.query(`ALTER TABLE "event_types" ADD "events_id" uuid`);
        await queryRunner.query(`ALTER TABLE "event_types" ADD CONSTRAINT "FK_07885ab799195a2f25aee8b6cd1" FOREIGN KEY ("events_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
