create table rutas(
	id_ruta int GENERATED ALWAYS AS IDENTITY primary key,
	nombre varchar (30)
);
create table intermedia(
	id_via int,
	id_ruta int,
	primary key(id_via, id_ruta)
);
alter table intermedia add constraint fkid_via foreign key (id_via)
  															references lines2 (id);
alter table intermedia add constraint fkid_ruta foreign key (id_ruta)
  															references rutas(id_ruta);
	
CREATE OR REPLACE FUNCTION addruta(puntos integer[], nombre varchar(30))
returns void AS $$
	DECLARE 
		idT int;
	BEGIN	
		 
		 INSERT INTO rutas(nombre) values (nombre) returning id_ruta INTO idT;
		 
		 FOR i IN array_lower(puntos, 1) .. array_upper(puntos,1)LOOP
		 	INSERT INTO intermedia values (puntos[i], idT);
		END LOOP;
	
	END; $$ LANGUAGE plpgsql;
	
SELECT addruta(ARRAY[86, 94, 71, 84, 42, 40, 102, 36, 38, 80], 'Ruta 1');
SELECT addruta(ARRAY[86, 94, 71, 84, 42, 40, 65, 64, 38, 80], 'Ruta 2');
SELECT addruta(ARRAY[10, 11, 12, 18, 21, 22, 32, 33, 4, 47, 48, 50, 54, 6, 69, 70, 72, 76, 77, 8, 89, 93, 97], 'Ruta 3');
SELECT addruta(ARRAY[14, 4, 66, 82, 9], 'Ruta 4');
SELECT addruta(ARRAY[14, 15, 16, 17, 43, 44, 85], 'Ruta 5');
SELECT addruta(ARRAY[46, 83, 85], 'Ruta 6');
SELECT addruta(ARRAY[37, 44, 45, 67, 83, 91, 92], 'Ruta 7');
SELECT addruta(ARRAY[23, 34, 41, 47, 55, 60, 73, 81, 88, 90], 'Ruta 8');
SELECT addruta(ARRAY[1, 24, 37, 4, 54, 57, 61, 68, 72], 'Ruta 9');
SELECT addruta(ARRAY[49, 62, 70, 77, 87], 'Ruta 10');
SELECT addruta(ARRAY[13, 18, 2, 29, 5, 50, 51, 59, 6, 7, 74, 78, 81, 93], 'Ruta 11');
SELECT addruta(ARRAY[2, 27, 28, 3, 39, 53, 73, 79, 81], 'Ruta 12');
SELECT addruta(ARRAY[10, 101, 21, 27, 31, 33, 35, 39, 52, 53, 59, 63, 70, 75], 'Ruta 13');
SELECT addruta(ARRAY[11, 18, 19, 2, 21, 23, 24, 25, 3, 37, 48, 50, 53, 55, 56, 57, 67, 76, 90, 98, 99], 'Ruta 14');
SELECT addruta(ARRAY[30, 58, 69, 72], 'Ruta 15');
SELECT addruta(ARRAY[58, 68, 69, 96], 'Ruta 16');
SELECT addruta(ARRAY[20, 49, 78, 94], 'Ruta 17');
SELECT addruta(ARRAY[100, 26, 29, 31, 47, 8, 89, 90, 95], 'Ruta 18');

--ejemplo obtener una ruta
/*select id, geom from lines2 inner join intermedia on id=id_via 
inner join rutas on intermedia.id_ruta=rutas.id_ruta where rutas.nombre='Ruta 13'*/

--consulta para ver cuantas vias falta de permanecer a una ruta
--select id, geom from lines2 EXCEPT SELECT id, geom from lines2 inner join intermedia on id=id_via 