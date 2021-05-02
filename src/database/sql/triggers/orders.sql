create function trigger_before_orders_delete () returns trigger as $$
declare
	device int;
begin
	delete from devices where devices.id = (
		select devices.id from devices
		left join orders on devices.id = OLD.device_id
		where orders.id = old.id
	);
	delete from orders where orders.id = OLD.id;
	return OLD;
end;
$$ language plpgsql;

drop trigger if exists tr_before_orders_delete on orders;
create trigger tr_before_orders_delete
before delete
on orders
for each row
execute procedure trigger_before_orders_delete();
