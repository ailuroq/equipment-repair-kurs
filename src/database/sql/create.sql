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


CREATE TABLE IF NOT EXISTS  "device" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"photo" VARCHAR(255) NOT NULL,
	"countryId" integer,
	"brandId" integer,
	"clientId" integer,
	"modelId" integer,
	CONSTRAINT "device_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "model" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "model_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "repair_firm" (
	"id" serial,
	"name" varchar(255),
	"address" varchar(255),
	"phone" varchar(255),
	"cityId" integer,
	CONSTRAINT "repair_firm_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "city" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "city_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "post" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "post_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "Client" (
	"id" serial NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"middlename" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	CONSTRAINT "Client_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "repairs" (
	"id" serial NOT NULL,
	"orderId" integer NOT NULL,
	"workId" integer NOT NULL,
	CONSTRAINT "repairs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "work" (
	"id" serial NOT NULL,
	"type" VARCHAR(255) NOT NULL,
	"description" VARCHAR(255) NOT NULL,
	"price" FLOAT NOT NULL,
	"completion" BOOLEAN NOT NULL,
	CONSTRAINT "work_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE IF NOT EXISTS  "master" (
	"id" serial NOT NULL,
	"lastname" VARCHAR(255) NOT NULL,
	"firstname" VARCHAR(255) NOT NULL,
	"middlename" VARCHAR(255) NOT NULL,
	"experience" integer NOT NULL,
	"firmId" integer,
	"postId" integer,
	CONSTRAINT "master_pk" PRIMARY KEY ("id")
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


CREATE TABLE IF NOT EXISTS  "brand" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT "brand_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("deviceId") REFERENCES "device"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("firmId") REFERENCES "repair_firm"("id");

ALTER TABLE "device" ADD CONSTRAINT "device_fk0" FOREIGN KEY ("countryId") REFERENCES "country"("id");
ALTER TABLE "device" ADD CONSTRAINT "device_fk1" FOREIGN KEY ("brandId") REFERENCES "brand"("id");
ALTER TABLE "device" ADD CONSTRAINT "device_fk2" FOREIGN KEY ("clientId") REFERENCES "Client"("id");
ALTER TABLE "device" ADD CONSTRAINT "device_fk3" FOREIGN KEY ("modelId") REFERENCES "model"("id");


ALTER TABLE "repair_firm" ADD CONSTRAINT "repair_firm_fk0" FOREIGN KEY ("cityId") REFERENCES "city"("id");


ALTER TABLE "repairs" ADD CONSTRAINT "repairs_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("id");
ALTER TABLE "repairs" ADD CONSTRAINT "repairs_fk1" FOREIGN KEY ("workId") REFERENCES "work"("id");


ALTER TABLE "master" ADD CONSTRAINT "master_fk0" FOREIGN KEY ("firmId") REFERENCES "repair_firm"("id");
ALTER TABLE "master" ADD CONSTRAINT "master_fk1" FOREIGN KEY ("postId") REFERENCES "post"("id");


