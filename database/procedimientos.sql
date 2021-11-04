--Función que recibe el numero de parada inicial y final de la ruta y devuelve las geometrias de la ruta mas corta.
--Devuelve distintas geometrias que conectan las paradas por las que debe pasar.
CREATE OR REPLACE FUNCTION fn_ruteo(punto INT, punto2 INT)
RETURNS SETOF lines2 AS $$ 
	BEGIN	
		RETURN QUERY 
		      SELECT  a.geom FROM pgr_dijkstra(
  'SELECT id,source, target, distancia as cost FROM lines2',
  punto, punto2, directed => false) as r inner join lines2 as a on (r.edge=a.id )
	
	END $$
	LANGUAGE plpgsql;
	
--Función que recibe el numero de parada inicial y final de la ruta y devuelve la geometria de la ruta mas corta.
--Devuelve una geometria que conectan las paradas por las que debe pasar.
CREATE OR REPLACE FUNCTION fn_collect_ruteo(punto INT, punto2 INT)
RETURNS SETOF lines2 AS $$ 
	BEGIN	
		RETURN QUERY 
		      SELECT  ST_CollectionExtract(st_collect(a.geom),2) FROM pgr_dijkstra(
  'SELECT id,source, target, distancia as cost FROM lines2',
  punto, punto2, directed => false) as r inner join lines2 as a on (r.edge=a.id )
	
	END; $$ LANGUAGE plpgsql;