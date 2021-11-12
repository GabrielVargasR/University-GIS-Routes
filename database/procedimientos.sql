--Función que recibe el numero de parada inicial y final de la ruta y devuelve las geometrias de la ruta mas corta.
--Devuelve distintas geometrias que conectan las paradas por las que debe pasar.
	CREATE OR REPLACE FUNCTION fn_ruteo(punto1 integer, punto2 integer)
RETURNS TABLE (nombre varchar(30), geom geometry)  AS $$ 
	BEGIN	
		RETURN QUERY 
		      SELECT DISTINCT ON (a.id) rutas.nombre,  a.geom  FROM pgr_dijkstra(
  'SELECT id,source, target, distancia as cost FROM lines2',
  punto1, punto2, directed => false) as r inner join lines2 as a on (r.edge=a.id ) 
  inner join intermedia as i on a.id=i.id_via inner join rutas on i.id_ruta=rutas.id_ruta;
	END; $$ LANGUAGE plpgsql;
	

--Función que recibe el numero de parada inicial y final de la ruta y devuelve la geometria de la ruta mas corta.
--Devuelve una geometria que conectan las paradas por las que debe pasar.
CREATE OR REPLACE FUNCTION fn_collect_ruteo(punto INT, punto2 INT)
RETURNS setof geometry AS $$ 
	BEGIN	
		RETURN QUERY 
		      SELECT  ST_CollectionExtract(st_collect(a.geom),2) FROM pgr_dijkstra(
  'SELECT id,source, target, distancia as cost FROM lines2',
  punto, punto2, directed => false) as r inner join lines2 as a on (r.edge=a.id );
	END; $$ LANGUAGE plpgsql;