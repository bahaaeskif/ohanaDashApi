import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1699205616669 implements MigrationInterface {
    name = 'InitDatabase1699205616669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name_ar" character varying(255) NOT NULL, "name_en" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "details_ar" character varying NOT NULL, "details_en" character varying NOT NULL, "colors" text array NOT NULL, "sizes" text array NOT NULL, "product_category_id" uuid NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name_ar" character varying(255) NOT NULL, "name_en" character varying(255) NOT NULL, "order" integer NOT NULL, "asset_id" uuid, CONSTRAINT "REL_22113bfe470ccc165bca1cabd8" UNIQUE ("asset_id"), CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying(255) NOT NULL, "order" integer NOT NULL DEFAULT '1', "mime_type" character varying(255) NOT NULL, "sizes_urls" jsonb NOT NULL, "product_id" uuid, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(1024) NOT NULL, CONSTRAINT "UQ_cb485a32c0e8b9819c08c1b1a1b" UNIQUE ("username"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."employee_role_enum" AS ENUM('Admin', 'Employee')`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(1024) NOT NULL, "role" "public"."employee_role_enum" NOT NULL DEFAULT 'Employee', CONSTRAINT "UQ_389fe2fe09430efb8eabc4e1b6e" UNIQUE ("username"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_c385a97195418da0bd3a08ceced" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_22113bfe470ccc165bca1cabd81" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_980f83643b37cdae0d37df0c3e8" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_980f83643b37cdae0d37df0c3e8"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_22113bfe470ccc165bca1cabd81"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_c385a97195418da0bd3a08ceced"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TYPE "public"."employee_role_enum"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
