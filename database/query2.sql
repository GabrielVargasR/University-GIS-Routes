drop table lines2;
drop table lines2_vertices_pgr;
create table lines2 as (select * from lines);
delete from lines2;
select * from lines2;
alter table lines2 add primary key (id);
ALTER TABLE lines2 ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;
do $$
	DECLARE 
		registro Record;
		cur cursor FOR SELECT * FROM lines;
begin
	FOR registro in cur loop
		INSERT INTO lines2(geom, name, highway, other_tags) select (st_dump(st_split(l.geom,
					(select st_collect(l1.geom) from lines as l1
			where st_intersects(l1.geom,
							(select l2.geom from lines as l2 where id=registro.id))
			and id!=registro.id)))).geom, name, highway, other_tags
		from lines as l where id=registro.id;
		
	  end loop;
end $$ 
Language 'plpgsql';

ALTER TABLE lines2 ADD source int;
ALTER TABLE lines2 ADD target int;

update lines2 set distancia=st_length(geom);
SELECT pgr_createTopology ('lines2', 1, 'geom','id', clean:=true);


--tablas opcionales

drop table estan;
create table estan--tabla para evr cuantos vertices estan conectados al nodo
as
select v.id,count(*),the_geom 
from lines2 a inner join lines2_vertices_pgr v
		on (a.source=v.id or a.target=v.id)
group by (v.id);

--Cantidad de segmentos de aceras relacionados por nodo detectados por intersessiones y con tolerancia de 1m
drop table deberian;
create table deberian--tabla para evr cuantos vertices deberían estar conectados al noto
as
select v.id,count(*),the_geom 
from lines2 a inner join lines2_vertices_pgr v
		on (st_intersects(st_buffer(v.the_geom,1),a.geom))
group by (v.id)

SELECT * FROM pgr_dijkstra(
  'SELECT id,source, target, distancia as cost FROM lines2',
  15, 38, FALSE) as r inner join lines2 as a on (r.edge=a.id)

drop table paradas;
create table paradas
as

select v.id,count(*),the_geom 
from lines2 a inner join lines2_vertices_pgr v
		on (a.source=v.id or a.target=v.id) where distancia/1000>4
group by (v.id);







