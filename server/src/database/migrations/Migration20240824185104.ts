import { Migration } from '@mikro-orm/migrations';

export class Migration20240824185104 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      'create table "atletica" ("id" serial primary key, "name" varchar(255) not null, "phone" varchar(15) not null, "email" varchar(255) not null);',
    );

    this.addSql(
      'create table "course" ("id" serial primary key, "name" varchar(255) not null);',
    );

    this.addSql(
      'create table "store" ("id" serial primary key, "name" varchar(255) not null, "cnpj" varchar(14) not null);',
    );

    this.addSql(
      'create table "product_category" ("id" serial primary key, "name" varchar(255) not null, "store_id" int not null);',
    );

    this.addSql(
      'create table "product" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "price" int not null, "quantity" int not null default 0, "category_id" int not null, "store_id" int not null);',
    );

    this.addSql(
      'create table "university" ("id" serial primary key, "name" varchar(255) not null, "address_street" varchar(255) not null, "address_neighborhood" varchar(255) not null, "address_complement" varchar(255) not null, "address_number" varchar(255) not null);',
    );

    this.addSql(
      'create table "university_course" ("id" serial primary key, "university_id" int not null, "course_id" int not null, "atletica_id" int not null);',
    );

    this.addSql(
      'create table "user" ("id" uuid not null default gen_random_uuid(), "username" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(15) not null, "name" varchar(255) not null, "password" varchar(255) not null, "type" text check ("type" in (\'student\', \'employee\')) not null, "created_at" varchar(255) not null, "store_id" int null, "university_course_id" int null, "points" int null, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql('create index "user_type_index" on "user" ("type");');

    this.addSql(
      'create table "purchase" ("id" serial primary key, "student_id" uuid not null, "store_id" int not null);',
    );

    this.addSql(
      'create table "purchase_product" ("id" serial primary key, "purchase_id" int not null, "product_id" int not null, "quantity" int not null);',
    );

    this.addSql(
      'alter table "product_category" add constraint "product_category_store_id_foreign" foreign key ("store_id") references "store" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "product" add constraint "product_category_id_foreign" foreign key ("category_id") references "product_category" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "product" add constraint "product_store_id_foreign" foreign key ("store_id") references "store" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "university_course" add constraint "university_course_university_id_foreign" foreign key ("university_id") references "university" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "university_course" add constraint "university_course_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "university_course" add constraint "university_course_atletica_id_foreign" foreign key ("atletica_id") references "atletica" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "user" add constraint "user_store_id_foreign" foreign key ("store_id") references "store" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "user" add constraint "user_university_course_id_foreign" foreign key ("university_course_id") references "university_course" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "purchase" add constraint "purchase_student_id_foreign" foreign key ("student_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "purchase" add constraint "purchase_store_id_foreign" foreign key ("store_id") references "store" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "purchase_product" add constraint "purchase_product_purchase_id_foreign" foreign key ("purchase_id") references "purchase" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "purchase_product" add constraint "purchase_product_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;',
    );
  }
}
