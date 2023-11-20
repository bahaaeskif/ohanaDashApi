import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagesToProduct1700252791885 implements MigrationInterface {
    name = 'AddImagesToProduct1700252791885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "images" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "colors" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "sizes" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "sizes" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "colors" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "images"`);
    }

}
