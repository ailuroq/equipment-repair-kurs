CREATE TABLE IF NOT EXISTS "orders"(
	"id" serial NOT NULL,
	"receipt_number" integer NOT NULL UNIQUE,
	"order_date" DATE NOT NULL,
	"completion_date" DATE,
	"order_completed" BOOLEAN NOT NULL,
	"device_id" integer,
	"firm_id" integer,
	CONSTRAINT "orders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "devices" (
	"id" serial NOT NULL,
	"name_id" integer,
	"photo" varchar(255) NOT NULL,
	"country_id" integer,
	"brand_id" integer,
	"client_id" integer,
	"model" varchar(255) NOT NULL,
	CONSTRAINT "devices_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "device_names" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "device_names_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "repair_firms" (
	"id" serial,
	"name" varchar(255),
	"address" varchar(255),
	"phone" varchar(255),
	"city_id" integer,
	CONSTRAINT "repair_firms_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "cities" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "cities_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "posts" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "clients" (
	"id" serial NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"middlename" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	CONSTRAINT "clients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "repairs" (
	"id" serial NOT NULL,
	"order_id" integer NOT NULL,
	"work_id" integer NOT NULL,
	"completion" BOOLEAN NOT NULL,
	CONSTRAINT "repairs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "work" (
	"id" serial NOT NULL,
	"type" VARCHAR(255) NOT NULL,
	"description" VARCHAR(255) NOT NULL,
	"price" FLOAT NOT NULL,
	CONSTRAINT "work_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "masters" (
	"id" serial NOT NULL,
	"lastname" VARCHAR(255) NOT NULL,
	"firstname" VARCHAR(255) NOT NULL,
	"middlename" VARCHAR(255) NOT NULL,
	"experience" integer NOT NULL,
	"firm_id" integer,
	"post_id" integer,
	CONSTRAINT "masters_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "country" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "country_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "brands" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "brands_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("firm_id") REFERENCES "repair_firms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "devices" ADD CONSTRAINT "devices_fk0" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "devices" ADD CONSTRAINT "devices_fk1" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "devices" ADD CONSTRAINT "devices_fk2" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "devices" ADD CONSTRAINT "devices_fk3" FOREIGN KEY ("name_id") REFERENCES "device_names"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "repair_firms" ADD CONSTRAINT "repair_firms_fk0" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "repairs" ADD CONSTRAINT "repairs_fk0" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "repairs" ADD CONSTRAINT "repairs_fk1" FOREIGN KEY ("work_id") REFERENCES "work"("id") ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE "masters" ADD CONSTRAINT "masters_fk0" FOREIGN KEY ("firm_id") REFERENCES "repair_firms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "masters" ADD CONSTRAINT "masters_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;


