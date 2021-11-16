create view stops as
	select id, st_transform(the_geom, 4326) as geom
	from paradas;

create view roads as
	select id, st_transform(geom, 4326) as geom
	from lines2;

--Función que recibe el numero de parada inicial y final de la ruta y devuelve las geometrias de la ruta mas corta.
--Devuelve distintas geometrias que conectan las paradas por las que debe pasar.
CREATE OR REPLACE FUNCTION fn_rutas(punto1 integer, punto2 integer)
RETURNS TABLE (
	nombre varchar(30), 
	geom geometry,
	distance_km double precision
)  AS $$ 
	BEGIN	
		RETURN QUERY 
		      SELECT DISTINCT ON (a.id) rutas.nombre,  st_transform(a.geom, 4326), st_length(st_transform(a.geom, 4326)::geography)/1000  FROM pgr_dijkstra(
  'SELECT id,source, target, distancia as cost FROM lines2',
  punto1, punto2, directed => false) as r inner join lines2 as a on (r.edge=a.id ) 
  inner join intermedia as i on a.id=i.id_via inner join rutas on i.id_ruta=rutas.id_ruta;
	END; $$ LANGUAGE plpgsql;