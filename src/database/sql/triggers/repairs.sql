create function trigger_after_repairs_delete () returns trigger as $$

begin

	return old;
end;
$$ language plpgsql;

drop trigger if exists tr_after_repairs_delete on repairs;
create trigger tr_after_repairs_delete
after delete
on repairs
for each row
execute procedure trigger_after_repairs_delete();
