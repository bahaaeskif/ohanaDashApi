import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1699460585178 implements MigrationInterface {
    name = 'UpdateProduct1699460585178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_status" AS ENUM('Pending', 'Canceled', 'On Way', 'Delivered')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "total_price" numeric(10,2) NOT NULL, "email" character varying(255) NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying(255) NOT NULL, "notes" character varying(2048) NOT NULL, "region" character varying NOT NULL, "address" character varying NOT NULL, "country" character varying NOT NULL, "status" "public"."order_status" NOT NULL DEFAULT 'Pending', CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "order_id" uuid NOT NULL, "product" jsonb NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD "model" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "model"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status"`);
    }

}
