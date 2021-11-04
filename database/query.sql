delete from lines where highway not in('primary', 'secondary', 'tertiary');
delete from lines where highway is null;
alter table lines drop column waterway;
alter table lines drop column aerialway;
alter table lines drop column barrier;
alter table lines drop column man_made;
alter table lines drop column z_order;
alter table lines drop column osm_id;
alter table lines drop column other_tags;

alter table lines add distancia double precision;

update lines set distancia=st_length(geom);

create table lines2 as (select * from lines);

delete from lines2;

ALTER TABLE lines2 ADD source int;
ALTER TABLE lines2 ADD target int;

update lines2 set distancia=st_length(geom);





 
