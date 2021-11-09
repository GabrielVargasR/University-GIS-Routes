-- view para cargar la capa de calles en geoserver
-- permite ver el id, el nombre y el geom (transformado a 4326) de cada calle
create view roads as
	select l.id, st_transform(l.geom, 4326) as geom, l.name
	from lines2 l

-- view para cargar la capa de paradas en geoserver
-- permite ver el id, el nombre y el geom (transformado a 4326) de cada parada
create view stops as
	select p.id, st_transform(p.the_geom, 4326) as geom, p.nombre as name
	from paradas p