CREATE TABLE IF NOT EXISTS "orders"(
	"id" serial NOT NULL,
	"receipt_number" integer NOT NULL UNIQUE,
	"order_date" TIMESTAMP NOT NULL,
	"completion_date" TIMESTAMP NOT NULL,
	"order_completed" BOOLEAN NOT NULL,
	"deviceId" integer,
	"firmId" integer,
	CONSTRAINT "orders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "devices" (
	"id" serial NOT NULL,
	"nameId" integer,
	"photo" varchar(255) NOT NULL,
	"countryId" integer,
	"brandId" integer,
	"clientId" integer,
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
	"cityId" integer,
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
	"orderId" integer NOT NULL,
	"workId" integer NOT NULL,
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
	"firmId" integer,
	"postId" integer,
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


ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("deviceId") REFERENCES "devices"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("firmId") REFERENCES "repair_firms"("id");

ALTER TABLE "devices" ADD CONSTRAINT "devices_fk0" FOREIGN KEY ("countryId") REFERENCES "country"("id");
ALTER TABLE "devices" ADD CONSTRAINT "devices_fk1" FOREIGN KEY ("brandId") REFERENCES "brands"("id");
ALTER TABLE "devices" ADD CONSTRAINT "devices_fk2" FOREIGN KEY ("clientId") REFERENCES "clients"("id");
ALTER TABLE "devices" ADD CONSTRAINT "devices_fk3" FOREIGN KEY ("nameId") REFERENCES "device_names"("id");


ALTER TABLE "repair_firms" ADD CONSTRAINT "repair_firms_fk0" FOREIGN KEY ("cityId") REFERENCES "cities"("id");


ALTER TABLE "repairs" ADD CONSTRAINT "repairs_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("id");
ALTER TABLE "repairs" ADD CONSTRAINT "repairs_fk1" FOREIGN KEY ("workId") REFERENCES "work"("id");


ALTER TABLE "masters" ADD CONSTRAINT "masters_fk0" FOREIGN KEY ("firmId") REFERENCES "repair_firms"("id");
ALTER TABLE "masters" ADD CONSTRAINT "masters_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");


