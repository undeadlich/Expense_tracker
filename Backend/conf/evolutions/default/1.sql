# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table expense (
  id                            bigint auto_increment not null,
  amount                        decimal(19,2) not null,
  category                      varchar(13) not null,
  description                   varchar(255),
  user_id                       bigint,
  expense_date                  datetime(6) not null,
  constraint ck_expense_category check (category in ('FOOD','TRANSPORT','SHOPPING','ENTERTAINMENT','HEALTH','EDUCATION','BILLS','TRAVEL','OTHER')),
  constraint pk_expense primary key (id)
);

create table expense_items (
  id                            bigint auto_increment not null,
  expense_id                    bigint,
  item_name                     varchar(255) not null,
  quantity                      integer not null,
  unit_price                    decimal(38) not null,
  constraint pk_expense_items primary key (id)
);

create table user (
  id                            bigint auto_increment not null,
  name                          varchar(255) not null,
  email                         varchar(255) not null,
  password                      varchar(255) not null,
  refresh_token                 varchar(255),
  refresh_token_expiry          datetime(6),
  constraint uq_user_email unique (email),
  constraint pk_user primary key (id)
);

alter table expense add constraint fk_expense_user_id foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_expense_user_id on expense (user_id);

alter table expense_items add constraint fk_expense_items_expense_id foreign key (expense_id) references expense (id) on delete restrict on update restrict;
create index ix_expense_items_expense_id on expense_items (expense_id);


# --- !Downs

alter table expense drop foreign key fk_expense_user_id;
drop index ix_expense_user_id on expense;

alter table expense_items drop foreign key fk_expense_items_expense_id;
drop index ix_expense_items_expense_id on expense_items;

drop table if exists expense;

drop table if exists expense_items;

drop table if exists user;

