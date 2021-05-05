create function trigger_after_device_delete () returns trigger as $$
begin
	delete from clients
    using clients as cl
    left join devices on cl.id = devices.client_id
    where clients.id = cl.id and
    devices.id is null;
	return old;
end;
$$ language plpgsql;

drop trigger if exists tr_after_device_delete on devices;
create trigger tr_after_device_delete
after delete
on devices
for each row
execute procedure trigger_after_device_delete();



//check users without devices
select * from clients
left join devices on clients.id = devices.client_id
where devices.id is null
order by clients.id desc


create function trigger_after_device_delete () returns trigger as $$
declare
	client int;
	device int;
begin
	select clients.id into client from clients
	left join devices on clients.id = devices.client_id
	where devices.id = old.id;

	select count(distinct devices.id) into device from clients
	left join devices on clients.id = devices.client_id
	where clients.id = client;

	raise notice 'client: %', client;
	raise notice 'device: %', device;

	if (device) = 1
	then
		delete from clients where clients.id = client;
	end if;
	return old;
end;
$$ language plpgsql;

drop trigger if exists tr_after_device_delete on devices;
create trigger tr_after_device_delete
before delete
on devices
for each row
execute procedure trigger_after_device_delete();
